import foodModel from "../models/foodModel.js";
import fs from 'fs'
import cloudinary from '../config/cloudinary.js';

// Helper function to check if Cloudinary is available
const isCloudinaryAvailable = () => {
    return process.env.CLOUDINARY_CLOUD_NAME && 
           process.env.CLOUDINARY_API_KEY && 
           process.env.CLOUDINARY_API_SECRET;
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// get deals
const getDeals = async (req, res) => {
    try {
        const foods = await foodModel.find({ isDeal: true })
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// get popular
const getPopular = async (req, res) => {
    try {
        const foods = await foodModel.find({ isPopular: true })
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// get featured
const getFeatured = async (req, res) => {
    try {
        const foods = await foodModel.find({ isFeatured: true })
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// update flags
const updateFlag = async (req, res) => {
    try {
        const { id, flag, value } = req.body;
        await foodModel.findByIdAndUpdate(id, { [flag]: value });
        res.json({ success: true, message: "Flag updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating flag" });
    }
}

// add food
const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: "No image provided" });
        }

        let imageUrl;

        if (isCloudinaryAvailable()) {
            try {
                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'food-items',
                    resource_type: 'auto'
                });
                imageUrl = result.secure_url;
                console.log('✅ Image uploaded to Cloudinary:', imageUrl);
            } catch (cloudinaryError) {
                console.error('❌ Cloudinary upload failed:', cloudinaryError);
                // Fallback to local storage
                imageUrl = req.file.filename;
                console.log('⚠️ Falling back to local storage:', imageUrl);
            }
        } else {
            // Fallback to local storage
            imageUrl = req.file.filename;
            console.log('⚠️ Cloudinary not configured, using local storage:', imageUrl);
        }

        // Clean up local file if uploaded to Cloudinary
        if (imageUrl.startsWith('http')) {
            try {
                fs.unlinkSync(req.file.path);
                console.log('✅ Local file cleaned up');
            } catch (unlinkError) {
                console.log('⚠️ Error cleaning up local file:', unlinkError);
            }
        }

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageUrl,
            isDeal: req.body.isDeal === 'true' || req.body.isDeal === true
        })

        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        // Clean up local file if it exists
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.log("Error deleting local file:", unlinkError);
            }
        }
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.json({ success: false, message: "Food ID is required" });
        }

        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }
        
        if (food.image) {
            // Delete from Cloudinary if it's a Cloudinary URL
            if (food.image.includes('cloudinary.com')) {
                try {
                    const publicId = food.image.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`food-items/${publicId}`);
                } catch (cloudinaryError) {
                    console.log("Error deleting from Cloudinary:", cloudinaryError);
                }
            } else {
                // Delete local file if it exists
                try {
                    fs.unlinkSync(`uploads/${food.image}`);
                } catch (unlinkError) {
                    console.log("Error deleting local file:", unlinkError);
                }
            }
        }

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// update food
const updateFood = async (req, res) => {
    try {
        const { id, name, description, price, category, isDeal } = req.body;
        let updateData = { name, description, price, category };
        if (typeof isDeal !== 'undefined') {
            updateData.isDeal = (isDeal === 'true' || isDeal === true);
        }
        
        if (req.file) {
            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'food-items',
                resource_type: 'auto'
            });

            // Clean up local file
            fs.unlinkSync(req.file.path);

            // Remove old image
            const food = await foodModel.findById(id);
            if (food && food.image) {
                if (food.image.includes('cloudinary.com')) {
                    try {
                        const publicId = food.image.split('/').pop().split('.')[0];
                        await cloudinary.uploader.destroy(`food-items/${publicId}`);
                    } catch (cloudinaryError) {
                        console.log("Error deleting old image from Cloudinary:", cloudinaryError);
                    }
                } else {
                    // Delete old local file if it exists
                    try {
                        fs.unlinkSync(`uploads/${food.image}`);
                    } catch (unlinkError) {
                        console.log("Error deleting old local file:", unlinkError);
                    }
                }
            }
            
            updateData.image = result.secure_url;
        }
        
        await foodModel.findByIdAndUpdate(id, updateData);
        res.json({ success: true, message: "Food updated successfully" });
    } catch (error) {
        console.log(error);
        // Clean up local file if it exists
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.log("Error deleting local file:", unlinkError);
            }
        }
        res.json({ success: false, message: "Error updating food" });
    }
}

export { listFood, addFood, removeFood, getDeals, getPopular, getFeatured, updateFlag, updateFood }