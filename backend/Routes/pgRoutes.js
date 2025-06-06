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

module.exports = router;
