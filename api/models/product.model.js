import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Active",
      enum: ["Active", "Inactive", "Maintenance"],
    },
    // line: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Line",
    //   required: true,
    // },
    line: {
      type: Number,
      enum: ["1", "2", "3", "4", "5", "6", "7"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
