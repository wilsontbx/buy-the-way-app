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
  statusopen: {
    type: Boolean,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
});

const TransactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = TransactionModel;
