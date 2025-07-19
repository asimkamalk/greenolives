import foodModel from "../models/foodModel.js";
import fs from 'fs'

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

// Get deals
const getDeals = async (req, res) => {
    try {
        const foods = await foodModel.find({ isDeal: true });
        res.json({ success: true, data: foods });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

// Get most popular
const getPopular = async (req, res) => {
    try {
        const foods = await foodModel.find({ isPopular: true });
        res.json({ success: true, data: foods });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

// Get featured
const getFeatured = async (req, res) => {
    try {
        const foods = await foodModel.find({ isFeatured: true });
        res.json({ success: true, data: foods });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

// add food
const addFood = async (req, res) => {

    try {
        let image_filename = `${req.file.filename}`

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category,
            image: image_filename,
        })

        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

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
        const { id, name, description, price, category } = req.body;
        let updateData = { name, description, price, category };
        if (req.file) {
            // Remove old image
            const food = await foodModel.findById(id);
            if (food && food.image) {
                fs.unlink(`uploads/${food.image}`, () => {});
            }
            updateData.image = req.file.filename;
        }
        await foodModel.findByIdAndUpdate(id, updateData);
        res.json({ success: true, message: "Food updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food" });
    }
}

// Update a flag (isDeal, isPopular, isFeatured)
const updateFlag = async (req, res) => {
    try {
        const { id, flag, value } = req.body;
        if (!['isDeal', 'isPopular', 'isFeatured'].includes(flag)) {
            return res.json({ success: false, message: 'Invalid flag' });
        }
        await foodModel.findByIdAndUpdate(id, { [flag]: value });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: 'Error updating flag' });
    }
};

export { listFood, addFood, removeFood, updateFood, getDeals, getPopular, getFeatured, updateFlag }