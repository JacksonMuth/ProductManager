const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
        minlength: [2, "Title must be at least 2 characters."],
        maxlength: [100, "Server space isn't free!"]
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
        min: [1, "Price must be at least $1."]
    },
    description: {
        type: String,
        required: [true, "Description is required."],
        minlength: [10, "Description must be at least 10 characters."]
    }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;