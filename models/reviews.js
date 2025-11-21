const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  gameName: { type: String, required: true },
  user: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);
