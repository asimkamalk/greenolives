import mongoose from "mongoose";
import 'dotenv/config'; // Make sure to load the env file

// Hardcode relative paths based on script location, or rely on execution context
import { connectDB } from "../config/db.js";
import userModel from "../models/userModel.js";

const cleanupUsers = async () => {
    try {
        await connectDB();
        console.log("Connected to MongoDB for cleanup...");

        const adminEmail = 'newgreenolives@gmail.com';

        // Delete all users whose email does not match the admin email
        const result = await userModel.deleteMany({ email: { $ne: adminEmail } });

        console.log(`Deleted ${result.deletedCount} non-admin user(s).`);

        const remainingUsers = await userModel.find({});
        console.log(`Remaining user(s) in the database: ${remainingUsers.length}`);

        process.exit(0);
    } catch (error) {
        console.error("Error setting up admin user:", error);
        process.exit(1);
    }
}

cleanupUsers();
