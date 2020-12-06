const mongoose = require("mongoose");

const preOrderSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    unique: true,
  },
  // productslug: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  imageURL: {
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
  foodexpiry: String,
  foodchilled: String,
  foodspecial: String,
  collectspecial: String,
  returndate:String
  // created_at: {
  //   type: Date,
  //   required: true,
  //   default: Date.now,
  // },
  // updated_at: {
  //   type: Date,
  //   required: true,
  //   default: Date.now,
  // },
});

const PreOrderModel = mongoose.model("Preorder", preOrderSchema);

module.exports = PreOrderModel;
