const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    unique: true,
  },
  productslug: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  foodexpiry: Boolean,
  foodchilled: Boolean,
  foodspecial: Boolean,
  collectspecial: String,
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
