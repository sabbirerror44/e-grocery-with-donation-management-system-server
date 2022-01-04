const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
  jobId: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNo: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
