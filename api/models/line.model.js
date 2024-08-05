import mongoose from "mongoose";

const lineSchema = new mongoose.Schema(
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
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
    tolerances: {
      type: Object,
      default: {
        profillometer: {
          navPad: [-0.13, 0.13],
          nose: [-0.13, 0.13],
          pinion: [200, 500],
          gear: [200, 500],
          trunnion: [200, 500],
        },
        diffBore: [-0.018, 0.018],
        tubeBore: [-0.038, 0.038],
        frontBore: [-0.018, 0.018],
        rearBore: [-0.018, 0.018],
        oilSeal: [-0.05, 0.05],
        trunnion: [-0.023, 0.023, "None"],
        bushing: [-0.038, 0.038, , "None"],
      },
    },
    jobs: {
      type: [String],
      default: [
        "Training",
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
    gauges: {
      type: [String],
      default: [
        "Bushing Gauge",
        "Differenctial Gauge",
        "Tube Gauge",
        "Front Gauge",
        "Rear Gauge",
        "Oil Seal Gauge",
        "Bushing Go",
        "Bushing No-Go",
        "Profilometer",
        "Face Go",
        "Face No-Go",
        "Torque Guage",
      ],
    },
    toolsToAdjust: {
      type: [String],
      default: [],
    },
    toolsToChange: {
      type: [String],
      default: [],
    },
    tools: {
      type: [String],
      default: [
        "Allen Wrech",
        "Screwdriver",
        "Wrench",
        "Insert Screw",
        "De-chipper",
      ],
    },
    toolsImg: {
      type: [String],
      default: "None",
    },
    partImg: {
      type: [String],
      default: "None",
    },
  },
  {
    timestamps: true,
  }
);

const Line = mongoose.model("Line", lineSchema);

export default Line;
