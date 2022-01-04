const fs = require("fs");
// internal imports
const Candidate = require("../Models/Candidate");

// candidate applied information handlers
const saveInformation = async (req, res) => {
  try {
    req.body.resume = req.file.filename;
    const informations = new Candidate(req.body);
    await informations.save();
    res.status(200).json({
      message: "Successfully submitted",
    });
  } catch (err) {
    const path = __dirname + `/../uploads/${req.file.filename}`;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
      }
    });
    res.status(500).json({
      message: err.message,
    });
  }
};

// get all candidates for specific job
const allCandidates = async (req, res) => {
  try {
    const candidatelist = await Candidate.find({ jobId: req.params.id });
    res.status(200).json(candidatelist);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { saveInformation, allCandidates };
