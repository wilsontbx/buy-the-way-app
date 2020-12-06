const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  productslug: {
    type: String,
    required: true,
  },
  url: String,
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  message: String,
  receipt: String,
  useremail: {
    type: String,
    required: true,
  },
});

const TransactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = TransactionModel;
