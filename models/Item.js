const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required."],
  }
});

module.exports = mongoose.model('Item', itemSchema);