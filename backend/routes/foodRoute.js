import express from 'express';
import { addFood, listFood, removeFood, getDeals, getPopular, getFeatured, updateFlag, updateFood } from '../controllers/foodController.js';
import multer from 'multer';
import os from 'os';
import path from 'path';
const foodRouter = express.Router();

// Temporary storage for Cloudinary upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, os.tmpdir()); // Use system temp directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })

foodRouter.get("/list",listFood);
foodRouter.get("/deals", getDeals);
foodRouter.get("/popular", getPopular);
foodRouter.get("/featured", getFeatured);
foodRouter.post("/add",upload.single('image'),addFood);
foodRouter.post("/remove",removeFood);
foodRouter.post("/update", upload.single('image'), updateFood);
foodRouter.post("/updateFlag", updateFlag);

export default foodRouter;