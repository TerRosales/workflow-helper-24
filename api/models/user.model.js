import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: function () {
        return !this.isGuest; // Email is required only if the user is not a guest
      },
      unique: true,
      sparse: true, // Allows null values in unique index
    },
    password: {
      type: String,
      required: function () {
        return !this.isGuest; // Password is required only if the user is not a guest
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: null,
    },
    department: {
      type: Number,
      default: "0",
      enum: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    employeeImg: {
      type: String,
      default: "https://static.thenounproject.com/png/354384-200.png",
    },
    employeeId: {
      type: Number,
      required: true,
      default: "0000",
    },
    qualification: {
      type: Array,
      default: ["N / A"],
    },
    isGuest: {
      type: Boolean,
      default: false, // New field to distinguish guest users
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
