const express = require("express");
const FAQCollection = require("../models/FAQcollection");
const router = express.Router();

//#1. router to add FAQ question and answer
router.post("/addFaq", async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newFaq = new FAQCollection({ question, answer });
    const faqData = await newFaq.save();
    res.status(201).json({ faqData });
  } catch (error) {
    res.status(400).json({ error: "Failed to add FAQ" });
  }
});

//#2. router to get all faq from the faqcollections
router.get("/getFAQ", async (req, res) => {
  try {
    const faqs = await FAQCollection.find();
    res.status(201).json(faqs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

module.exports = router;
