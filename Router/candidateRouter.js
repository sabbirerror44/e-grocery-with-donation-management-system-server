const express = require("express");
const router = express.Router();
const multerHandler = require("../Middlewares/candidate/candidateMulterHandler");

// internal imports
const {
  saveInformation,
  allCandidates,
} = require("../Controller/candidateController");

//cadidate documents post
router.post("/", multerHandler.upload.single("resume"), saveInformation);

router.get("/candidate/:id", allCandidates);
module.exports = router;
