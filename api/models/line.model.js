import mongoose from "mongoose";


const lineSchema = new mongoose.Schema({
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
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: [],
    }],
}, {
    timestamps: true,
})

const Line = mongoose.model("Line", lineSchema);

export default Line;