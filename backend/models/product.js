import { Schema, model } from "mongoose";

const productSchema = Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
});

export default model('Product', productSchema);