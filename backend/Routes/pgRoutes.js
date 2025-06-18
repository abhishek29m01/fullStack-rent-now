const epxress = require("express");
const PgCollection = require("../models/PgCollections");
const upload = require("../config/uploadImage");

const router = epxress.Router();

//Route to upload PG data with images
router.post("/addpg", upload.array("images", 5), async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => file.path.replace(/\\/g, "/"));
    const pgData = new PgCollection({ ...req.body, images: imagePaths });

    const savedPgs = await pgData.save();
    res.status(201).json(savedPgs);
  } catch (error) {}
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

module.exports = router;
