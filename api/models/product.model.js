import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    line: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Line',
        required: true,
    },
    machines: {
        type: Number,
        enum: ["1", "2", "3", "4", "5", "6"],
        required: true,
    },
    tools: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,

})

const Product = mongoose.model("Product", productSchema);

export default Product;