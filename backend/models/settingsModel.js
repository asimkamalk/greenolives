import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    openingHour: { type: String, required: true }, // e.g., "10:00"
    closingHour: { type: String, required: true }, // e.g., "00:00"
    timezone: { type: String, default: "Asia/Karachi" },
}, { minimize: false });

const settingsModel = mongoose.models.settings || mongoose.model("settings", settingsSchema);
export default settingsModel; 