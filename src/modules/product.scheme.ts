import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    id: Number,
    name: String,
    category: String,
    saletype: String,
    soldby: String,
    price: Number,
    description: String,
    popular: Boolean,
    imageUrls: Object
});