const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        // cannot be blank or null
    },
    url: String,
    qty: Number,
    price: String,
    message: String,
    receipt: String,

});

const TransactionModel = mongoose.model("Transaction", transactionSchema);
//Transaction : collection

module.exports = TransactionModel;
//add TransactionModel to library