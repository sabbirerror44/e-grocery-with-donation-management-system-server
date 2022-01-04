const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    password: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      enum: ['pending', 'accept'],
      default: "pending",
  }
  });

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
