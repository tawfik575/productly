const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
});

module.exports = productSchema;