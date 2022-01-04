const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    stock:{
        type: Number,
        required: true,
        trim: true
    }
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;