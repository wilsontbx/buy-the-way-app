const mongoose = require("mongoose");
// testing
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
