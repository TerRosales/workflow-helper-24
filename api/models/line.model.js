import mongoose from "mongoose";

const lineSchema = new mongoose.Schema(
  {
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
      type: Boolean,
      required: true,
      default: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
    jobs: {
      type: String,
      default: "training",
      enum: [
        "training",
        "Jeno",
        "Capiter",
        "Jeno-S",
        "Capiter-S",
        "Bushing Press",
        "Uplift",
        "Manual Jeno",
        "Manual Capiter",
        "Manual Jeno-S",
        "Manual Capiter-S",
        "Manual Bushing Press",
        "Manual Uplift",
      ],
    },
    tools: {
      type: String,
      default: "None",
      enum: ["Allen Wrech", "Screwdriver", "Wrench", "None"],
    },
  },
  {
    timestamps: true,
  }
);

const Line = mongoose.model("Line", lineSchema);

export default Line;
