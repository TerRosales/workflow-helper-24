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
    troubleShootingCheckList: {
      type: [String],
      default: [
        "Check and Read Fault Codes",
        "Double spray parts for debris or damage",
        "Check Robot Position",
        "Check Nest and Machine numbers",
        "Get all data needed to troubleshoot",
        "Backtrack for any changes made to the tool",
        "Grab the necessary tools",
      ],
    },
    troubleShootQualifications: {
      type: Object,
      default: {
        robot: [
          {
            issue: "Robot Fault Fix",
            solution: "Solution Robot Fault Fix",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Check if the robot is powered on",
              "Check if the robot is properly calibrated",
              "Check if the robot is properly programmed",
              "Check all entry and exit points",
            ],
          },
          {
            issue: "Sensor Fault Fix",
            solution: "Solution Sensor Fault Fix",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Check if the sensor is clean and free of any debris",
              "Check if the sensor is properly calibrated",
              "Check if the sensor is properly programmed",
              "Check all entry and exit points",
            ],
          },
          {
            issue: "3D Etch Fault Fix",
            solution: "Solution 3D Etch Fault Fix",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Clean the 3D Etch Sensor",
              "Clean the 3D Etch Lens",
              "Check if the 3D Etch Sensor is properly calibrated",
              "Check if the 3D Etch Sensor is properly programmed",
            ],
          },
          {
            issue: "CNC Fault",
            solution: "Solution CNC Fault",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Reset Door (Open and Close)",
              "Check if part is loaded properly",
              "Check all entry and exit points",
            ],
          },
        ],
        jeno: [
          {
            issue: "Jeno Fault Fix",
            solution: "Solution Jeno Fault Fix",
            troubleShootSteps: [
              "Clean all the sensors",
              "Check if the Jeno is properly calibrated",
              "Check if the Jeno is properly programmed",
              "Check all screens if they are properly displaying all the data needed",
              "Check all entry and exit points",
            ],
          },
          {
            issue: "Mastering Fault Fix",
            solution: "Solution Mastering Fault Fix",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Do not wear gloves when handling the Master part",
              "Clean the Master part",
              "Clean all the sensors",
              "Check Control Panel to ensure the Master is feature is active",
              "Check if the Jeno is properly calibrated",
              "Check if the Jeno is properly programmed",
            ],
          },
          {
            issue: "Gauge Collision Fault Fix",
            solution: "Solution Gauge Collision Fault Fix",
            troubleShootSteps: [
              "Reset gauging sequence",
              "Check if the Part is loaded properly",
              "Check if the Part is scanned properly",
              "Double check the Jeno run way an make sure it is clear",
              "Check all entry and exit points",
              "Rescan and reload the Part",
            ],
          },
          {
            issue: "3D Etch Fault Fix",
            solution: "Solution 3D Etch Fault Fix",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Clean the 3D Etch Sensor",
              "Clean the 3D Etch Lens",
              "Check if the 3D Etch Sensor is properly calibrated",
              "Check if the 3D Etch Sensor is properly programmed",
              "Clean the 3D code with the cleaning solution provided",
              "Scan the 3D code on different angles",
              "If code fails to scan, mark the part as a rework and move to the part",
            ],
          },
          {
            issue: "Tools Adjustment",
            solution: "Solution Tools Adjustment",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Double check part and blow it out",
              "If the part DIFF BORE is over/under 0.02/-0.02 miscrons this can easily be adjusted by tightening(if over) or loosening(if under) the bolts with the drill provided",
              "First encounter, adjust tools by the calculated micron, Note the machine and adjustment takes two turns to take effect",
              "Second encounter, Check Notes if the adjustment was made, if not, adjust tools by the calculated micron, Note the machine and adjustment takes two turns to take effect",
              "Third encounter, if the issue persists and scrap reaches pass 4 pieces, call the your team leader for further assistance",
              "Put CNC back in Auto",
            ],
          },
        ],
        capiter: [
          {
            issue: "Capiter Fault Fix",
            solution: "Solution Capiter Fault Fix",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Check if the Capiter is properly calibrated",
              "Check if parts were installed incorrectly",
              "Check all screens if they are properly displaying all the data needed",
              "Check all entry and exit points",
            ],
          },
          {
            issue: "Converyer Fault Fix",
            solution: "Solution Converyer Fault Fix",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Check if the sensor is clean and free of any debris",
              "Check if the sensor is properly calibrated",
              "Check if the sensor is properly programmed",
              "Check all entry and exit points",
            ],
          },
          {
            issue: "3D Etch Fault Fix",
            solution: "Solution 3D Etch Fault Fix",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Clean the 3D Etch Sensor",
              "Clean the 3D Etch Lens",
              "Check if the 3D Etch Sensor is properly calibrated",
              "Check if the 3D Etch Sensor is properly programmed",
            ],
          },
          {
            issue: "Tools Change",
            solution: "Solution Tools Change",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Check screen for tool change alerts",
              "If the screen shows a tool change alert, determine which tool needs to be changed",
              "Check find if the tool is available in the tool counter, if not go to the tooler and ask for the tool",
              "Once the tool is available, find its ZRA number and save it",
              "If the tool inserts need to be rotated, take the tool out and rotate the tools the one of its good sides",
              "Always return used tools to the tool counter or tooler",
              "Do not mix used tools with new tools",
              "Put CNC back in Auto",
              "Reset count on the CNC screen, Use the ZRA to reset the tool cut data",
            ],
          },
        ],
        bushingPress: [
          {
            issue: "Bushing Press Fault Fix",
            solution: "Solution Bushing Press Fault Fix",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Press Home button to reset the machine position",
              "Turn key on the side",
              "Press Reset Button to reset machine process",
              "Double Check if part is loaded properly",
              "Check all entry and exit points",
            ],
          },
        ],
        uplift: [
          {
            issue: "Uplift Fault Fix",
            solution: "Solution Uplift Fault Fix",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Check if the Uplift is properly calibrated",
              "Check if parts were loaded incorrectly",
              "Check all screens if they are properly displaying all the data needed",
              "Check all entry and exit points",
            ],
          },
          {
            issue: "Tools Change",
            solution: "Solution Tools Change",
            trboueShootSteps: [
              "Check and Read Fault Codes",
              "Check screen for tool change alerts",
              "If the screen shows a tool change alert, determine which tool needs to be changed",
              "Check find if the tool is available in the tool counter, if not go to the tooler and ask for the tool",
              "Once the tool is available, find its ZRA number and save it",
              "If the tool inserts need to be rotated, take the tool out and rotate the tools the one of its good sides",
              "Always return used tools to the tool counter or tooler",
              "Do not mix used tools with new tools",
              "Put CNC back in Auto",
              "Reset count on the CNC screen, Use the ZRA to reset the tool cut data",
            ],
          },
          {
            issue: "Tool Adjustment",
            solution: "Solution Tool Adjustment",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Double check part and blow it out",
              "If the part DIFF BORE is over/under 0.02/-0.02 miscrons this can easily be adjusted by tightening(if over) or loosening(if under) the bolts with the drill provided",
              "First encounter, adjust tools by the calculated micron, Note the machine and adjustment takes two turns to take effect",
              "Second encounter, Check Notes if the adjustment was made, if not, adjust tools by the calculated micron, Note the machine and adjustment takes two turns to take effect",
              "Third encounter, if the issue persists and scrap reaches pass 4 pieces, call the your team leader for further assistance",
              "Put CNC back in Auto",
            ],
          },
          {
            issue: "3D Etch Fault Fix",
            solution: "Solution 3D Etch Fault Fix",
            troubleShootSteps: [
              "Check and Read Fault Codes",
              "Clean the 3D Etch Sensor",
              "Clean the 3D Etch Lens",
              "Check if the 3D Etch Sensor is properly calibrated",
              "Check if the 3D Etch Sensor is properly programmed",
            ],
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
        "Wrench (0.10) micron",
        "Wrench (0.20) micron",
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
