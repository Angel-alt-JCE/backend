const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  user: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
});

module.exports = mongoose.model("Review", reviewSchema);
