const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  vacancy: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  otherBenefits: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
