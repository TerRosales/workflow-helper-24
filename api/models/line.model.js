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
        trunnion: [-0.023, 0.023],
        bushing: [-0.038, 0.038],
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
    troubleShootQualifications: {
      type: Object,
      default: {
        robot: [
          {
            issue: "Robot Fault Fix",
            solution: "Solution Robot Fault Fix",
          },
          {
            issue: "Sensor Fault Fix",
            solution: "Solution Sensor Fault Fix",
          },
          {
            issue: "3D Etch Fault Fix",
            solution: "Solution 3D Etch Fault Fix",
          },
          {
            issue: "CNC Fault",
            solution: "Solution CNC Fault",
          },
        ],
        jeno: [
          {
            issue: "Jeno Fault Fix",
            solution: "Solution Jeno Fault Fix",
          },
          {
            issue: "Mastering Fault Fix",
            solution: "Solution Mastering Fault Fix",
          },
          {
            issue: "Gauge Collision Fault Fix",
            solution: "Solution Gauge Collision Fault Fix",
          },
          {
            issue: "3D Etch Fault Fix",
            solution: "Solution 3D Etch Fault Fix",
          },
          {
            issue: "Tools Adjustment",
            solution: "Solution Tools Adjustment",
          },
        ],
        capiter: [
          {
            issue: "Capiter Fault Fix",
            solution: "Solution Capiter Fault Fix",
          },
          {
            issue: "Converyer Fault Fix",
            solution: "Solution Converyer Fault Fix",
          },
          {
            issue: "3D Etch Fault Fix",
            solution: "Solution 3D Etch Fault Fix",
          },
          {
            issue: "Tools Change",
            solution: "Solution Tools Change",
          },
        ],
        bushingPress: [
          {
            issue: "Bushing Press Fault Fix",
            solution: "Solution Bushing Press Fault Fix",
          },
          {
            issue: "Tools Adjustment",
            solution: "Solution Tools Adjustment",
          },
        ],
        uplift: [
          {
            issue: "Uplift Fault Fix",
            solution: "Solution Uplift Fault Fix",
          },
          {
            issue: "Tools Change",
            solution: "Solution Tools Change",
          },
          {
            issue: "Tool Adjustment",
            solution: "Solution Tool Adjustment",
          },
          {
            issue: "3D Etch Fault Fix",
            solution: "Solution 3D Etch Fault Fix",
          },
        ],
      },
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
