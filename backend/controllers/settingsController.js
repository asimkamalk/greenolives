import settingsModel from "../models/settingsModel.js";

// Get current settings (open/close hours)
const getSettings = async (req, res) => {
    try {
        let settings = await settingsModel.findOne();
        if (!settings) {
            // Default if not set
            settings = await settingsModel.create({
                openingHour: "10:00",
                closingHour: "00:00",
                timezone: "Asia/Karachi"
            });
        }
        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching settings" });
    }
};

// Update settings (open/close hours)
const updateSettings = async (req, res) => {
    try {
        const { openingHour, closingHour, timezone } = req.body;
        let settings = await settingsModel.findOne();
        if (!settings) {
            settings = new settingsModel({ openingHour, closingHour, timezone });
        } else {
            if (openingHour) settings.openingHour = openingHour;
            if (closingHour) settings.closingHour = closingHour;
            if (timezone) settings.timezone = timezone;
        }
        await settings.save();
        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating settings" });
    }
};

export { getSettings, updateSettings }; 