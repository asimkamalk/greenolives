import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import foodModel from '../models/foodModel.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Convert image to base64
const imageToBase64 = (imagePath) => {
    try {
        const fullPath = path.join(process.cwd(), 'uploads', imagePath);
        if (fs.existsSync(fullPath)) {
            const imageBuffer = fs.readFileSync(fullPath);
            const base64String = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
            return base64String;
        }
        return null;
    } catch (error) {
        console.error(`Error converting image ${imagePath}:`, error);
        return null;
    }
};

// Migrate images to base64
const migrateImages = async () => {
    try {
        console.log('Starting image migration...');
        
        // Get all food items
        const foods = await foodModel.find({});
        console.log(`Found ${foods.length} food items`);
        
        let migratedCount = 0;
        let skippedCount = 0;
        
        for (const food of foods) {
            // Skip if already a base64 or URL
            if (food.image.startsWith('data:') || food.image.startsWith('http')) {
                console.log(`Skipping ${food.name} - already migrated or external`);
                skippedCount++;
                continue;
            }
            
            // Convert image to base64
            const base64Image = imageToBase64(food.image);
            if (base64Image) {
                // Update database
                await foodModel.findByIdAndUpdate(food._id, { image: base64Image });
                console.log(`Migrated ${food.name}`);
                migratedCount++;
            } else {
                console.log(`Failed to migrate ${food.name} - image not found`);
            }
        }
        
        console.log(`\nMigration complete!`);
        console.log(`Migrated: ${migratedCount}`);
        console.log(`Skipped: ${skippedCount}`);
        
    } catch (error) {
        console.error('Migration error:', error);
    } finally {
        mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
};

// Run migration
if (process.argv.includes('--run')) {
    connectDB().then(() => {
        migrateImages();
    });
} else {
    console.log('To run migration, use: node scripts/migrateImagesToBase64.js --run');
    console.log('This will convert all local images to base64 strings in the database.');
    console.log('Note: This is a temporary solution. Use Cloudinary for production.');
}
