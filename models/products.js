const mongoose = require("mongoose");
// testing
const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
        unique: true,
        // max:200
    },
    // product_slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    imageurl: {
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
    showfood: [{
        foodexpiry: String,
        foodchilled: String,
        foodspecial: String,
    }],
    showcollectible: [{
        collectspecial: { type: String },
    }],
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
