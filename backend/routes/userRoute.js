import express from 'express';
import { loginUser,registerUser,getUserData,updateUser, getFavorites, addFavorite, removeFavorite } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/data",auth,getUserData);
userRouter.put("/update",auth,updateUser);
userRouter.get("/favorites",auth,getFavorites);
userRouter.post("/favorites/add",auth,addFavorite);
userRouter.post("/favorites/remove",auth,removeFavorite);

export default userRouter;