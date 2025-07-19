import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password, address} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name, 
            email, 
            password: hashedPassword,
            address: address || {}
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//get user data
const getUserData = async (req,res) => {
    console.log("getUserData called with userId:", req.userId);
    try{
        const user = await userModel.findById(req.userId).select('-password')
        console.log("Found user:", user);
        res.json({success:true,data:user})
    } catch(error){
        console.log("Error in getUserData:", error);
        res.json({success:false,message:"Error"})
    }
}

//update user data
const updateUser = async (req,res) => {
    const {name, email, address} = req.body;
    try{
        const user = await userModel.findById(req.userId);
        if(!user){
            return res.json({success:false,message: "User not found"})
        }

        // Update user data
        user.name = name || user.name;
        user.email = email || user.email;
        if(address) {
            user.address = {
                firstName: address.firstName || user.address?.firstName || "",
                lastName: address.lastName || user.address?.lastName || "",
                street: address.street || user.address?.street || "",
                city: address.city || user.address?.city || "",
                phone: address.phone || user.address?.phone || ""
            };
        }

        await user.save();
        res.json({success:true,message: "Profile updated successfully"})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error updating profile"})
    }
}

export {loginUser, registerUser, getUserData, updateUser}