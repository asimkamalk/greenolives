import mongoose from "mongoose";
import bcrypt from "bcrypt";
import 'dotenv/config'; // Make sure to load the env file

// Hardcode relative paths based on script location, or rely on execution context
import { connectDB } from "../config/db.js";
import userModel from "../models/userModel.js";

const setupAdminUser = async () => {
    try {
        await connectDB();
        console.log("Connected to MongoDB");

        const email = 'newgreenolives@gmail.com';
        const password = 'admin@go123';
        
        let user = await userModel.findOne({ email });

        if (user) {
            console.log("User already exists. Updating password...");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
            await user.save();
            console.log("Admin user password updated successfully.");
        } else {
            console.log("User does not exist. Creating new user...");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const newUser = new userModel({
                name: "Admin",
                email: email,
                password: hashedPassword,
                address: {
                    firstName: "Admin",
                    lastName: "User",
                    street: "123 Admin St",
                    city: "Admin City",
                    phone: "1234567890"
                }
            });

            await newUser.save();
            console.log("Admin user created successfully.");
        }

        process.exit(0);

    } catch (error) {
        console.error("Error setting up admin user:", error);
        process.exit(1);
    }
}

setupAdminUser();
