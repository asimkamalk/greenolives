import express from 'express';
import { loginUser,registerUser,getUserData,updateUser } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/data",auth,getUserData);
userRouter.put("/update",auth,updateUser);

export default userRouter;