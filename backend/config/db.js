import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://asimkamalk:asimkamalk123@cluster0.cjgffnd.mongodb.net/FYP?retryWrites=true&w=majority&appName=Cluster0');
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error.message);
        process.exit(1);
    }
}

// Note: Replace 'your_connection_string_here' with your MongoDB Atlas connection string
// Example connection string format:
// mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name

// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.