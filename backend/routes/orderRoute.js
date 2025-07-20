import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders, placeOrder,updateStatus,userOrders, verifyOrder, placeOrderCod, deleteOrder, getDailySales, getMonthlySales, getYearlySales, setPaymentStatus } from '../controllers/orderController.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

const orderRouter = express.Router();

orderRouter.get("/list",listOrders);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.post("/place",authMiddleware,upload.single('paymentScreenshot'),placeOrder);
orderRouter.post("/status",updateStatus);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/placecod",authMiddleware,placeOrderCod);
orderRouter.post("/delete", deleteOrder);
orderRouter.post("/payment-status", setPaymentStatus);
orderRouter.get("/sales/daily", getDailySales);
orderRouter.get("/sales/monthly", getMonthlySales);
orderRouter.get("/sales/yearly", getYearlySales);

export default orderRouter;