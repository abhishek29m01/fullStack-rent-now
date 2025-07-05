const express = require("express");
const PgCollection = require("../models/PgCollections");
const upload = require("../config/uploadImage");
const jwt = require("jsonwebtoken");
const router = express.Router();

//Route to upload PG data with images
router.post("/addpg", upload.array("images", 5), async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token print karo:", token);
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const ownerId = decoded.userId;
    const imagePaths = req.files.map((file) => file.path.replace(/\\/g, "/"));
    const pgData = new PgCollection({
      ...req.body,
      images: imagePaths,
      ownerId: ownerId,
    });

    const savedPgs = await pgData.save();
    res.status(201).json(savedPgs);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error while saving PG", error });
  }
});

// router to get data from the database
router.get("/getPgData", async (req, res) => {
  try {
    const pgData = await PgCollection.find(); //fetch all pg and store in pgData
    res.status(200).json(pgData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data:", error });
    console.log(`Error fetching data: ${error}`);
  }
});

//route to get pg from pgID

router.get("/getPG/:id", async (req, res) => {
  try {
    const pg = await PgCollection.findById(req.params.id);
    if (!pg) return res.status(404).json({ message: "PG not found" });
    res.json(pg);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

//applied search filter options for pg-search-by-city
router.get("/filteredPG", async (req, res) => {
  try {
    const { min, max, category, city, roomType, search } = req.query;

    let filter = {};

    if (city && city !== "All") {
      filter.city = new RegExp("^" + city + "$", "i"); // Exact match, case-insensitive
    }

    if (category && category !== "All") {
      filter.pgtype = category;
    }

    if (roomType && roomType !== "All") {
      filter.category = roomType;
    }

    if (min || max) {
      filter.rent = {};
      if (min) filter.rent.$gte = parseInt(min);
      if (max) filter.rent.$lte = parseInt(max);
    }

    // 🔍 Search (combine inside $or only if search exists)
    if (search) {
      const regex = new RegExp(search, "i");

      // if filter already has conditions, wrap in $and
      filter = {
        $and: [
          filter,
          {
            $or: [
              { pgname: regex },
              { city: regex },
              { category: regex },
              { pgtype: regex },
              { address: regex }, // include address if it's searchable
            ],
          },
        ],
      };
    }
    console.log("Applied Filters:", filter);

    const pgs = await PgCollection.find(filter);
    res.json(pgs);
  } catch (err) {
    console.error("Filter error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get PG by Id (update purpose or anything else);
router.get("/getPgData/:id", async (req, res) => {
  try {
    const pg = await PgCollection.findById(req.params.id);
    if (!pg) {
      return res.status(404).json({ message: "PG not found for this id" });
    }
    res.json(pg);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch PG data" });
  }
});

//update pg data by ID
router.put("/updatePgData/:id", upload.array("images", 5), async (req, res) => {
  try {
    const existingPg = await PgCollection.findById(req.params.id);
    if (!existingPg) {
      return res.status(404).json({ message: "PG not found" });
    }

    // If new images are uploaded
    let updatedImages = existingPg.images;
    if (req.files && req.files.length > 0) {
      updatedImages = req.files.map((file) => file.path.replace(/\\/g, "/"));
    }

    // Merge updated data
    const updatedData = {
      ...req.body,
      images: updatedImages,
    };

    const updatedPg = await PgCollection.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedPg);
  } catch (error) {
    console.error("Update error:", error);
    res
      .status(500)
      .json({ error: "Failed to update PG", details: error.message });
  }
});

//delete pg by PG ID

router.delete("/deletePg/:id", async (req, res) => {
  try {
    const deletedPg = await PgCollection.findByIdAndDelete(req.params.id);
    if (!deletedPg) {
      return res.status(404).json({ message: "PG not found" });
    }
    res.json({ message: "PG deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete PG" });
  }
});

//getting distinc pg details by owners ID

router.post("/getPGsByOwner", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID Is required" });
  }

  try {
    const pgList = await PgCollection.find({ ownerId: userId });
    res.json(pgList);
    console.log(pgList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
