import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders, placeOrder,updateStatus,userOrders, verifyOrder, placeOrderCod, deleteOrder, getDailySales, getMonthlySales, getYearlySales } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get("/list",listOrders);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/status",updateStatus);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/placecod",authMiddleware,placeOrderCod);
orderRouter.post("/delete", deleteOrder);
orderRouter.get("/sales/daily", getDailySales);
orderRouter.get("/sales/monthly", getMonthlySales);
orderRouter.get("/sales/yearly", getYearlySales);

export default orderRouter;