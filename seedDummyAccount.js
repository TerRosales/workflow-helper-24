import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import User from "./api/models/user.model.js"; // Adjust the path as necessary

dotenv.config(); // Load environment variables from .env file

mongoose
  .connect(process.env.MONGODB)
  .then(async () => {
    const dummyAccounts = [
      {
        username: "guest1",
        email: "guest1@example.com",
        password: bcryptjs.hashSync("guest123", 10),
      },
      {
        username: "guest2",
        email: "guest2@example.com",
        password: bcryptjs.hashSync("guest123", 10),
      },
      {
        username: "guest3",
        email: "guest3@example.com",
        password: bcryptjs.hashSync("guest123", 10),
      },
    ];

    for (const account of dummyAccounts) {
      const user = new User(account);
      await user.save();
    }

    console.log("Dummy accounts seeded");
    mongoose.disconnect();
  })
  .catch((err) => console.error("DB connection failed:", err));
