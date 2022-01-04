const mongoose = require("mongoose");

const querySchema = mongoose.Schema({
    productId: {
        type: String,
        required: true,
        trim: true
      },
    productTitle:{
      type: String,
      required: true,
      trim: true
    },
    username:{
        type: String,
        required: true,
        trim: true
    },
    question: {
        type: String,
        required: true
      },
    answer: {
        type: String,
      },
  },
  {
    timestamps: true,
  }
  );

const Query = mongoose.model('Query', querySchema);

module.exports = Query;

