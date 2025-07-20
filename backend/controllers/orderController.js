import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe";
import mongoose from "mongoose";
import settingsModel from "../models/settingsModel.js";
import moment from "moment-timezone";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//config variables
const currency = "RS";
const deliveryCharge = 5;
const frontend_URL = 'http://localhost:5173';

// Helper to check if current time is within open hours
async function isWithinOpenHours() {
    let settings = await settingsModel.findOne();
    if (!settings) {
        // Default hours if not set
        settings = { openingHour: "10:00", closingHour: "00:00", timezone: "Asia/Karachi" };
    }
    const now = moment().tz(settings.timezone || "Asia/Karachi");
    const opening = moment.tz(settings.openingHour, "HH:mm", settings.timezone || "Asia/Karachi");
    let closing = moment.tz(settings.closingHour, "HH:mm", settings.timezone || "Asia/Karachi");
    // Handle midnight wrap (e.g., 10:00 to 00:00 means 10am to midnight)
    if (closing.isSameOrBefore(opening)) {
        closing.add(1, 'day');
    }
    // If now is before opening, or after closing, return false
    if (now.isBefore(opening) || now.isAfter(closing)) {
        return false;
    }
    return true;
}

// Placing User Order for Frontend (manual payment)
const placeOrder = async (req, res) => {
    try {
        if (!(await isWithinOpenHours())) {
            return res.status(403).json({ success: false, message: "We are currently closed. Please come back at 10am!" });
        }
        let paymentScreenshot = req.file ? req.file.filename : undefined;
        let address = req.body.address;
        if (typeof address === 'string') {
          try { address = JSON.parse(address); } catch (e) { address = {}; }
        }
        let items = req.body.items;
        if (typeof items === 'string') {
          try { items = JSON.parse(items); } catch (e) { items = []; }
        }
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: items,
            amount: req.body.amount,
            address: address,
            paymentMethod: req.body.paymentMethod,
            transactionId: req.body.transactionId,
            paymentScreenshot,
            paymentStatus: req.body.paymentMethod === 'cod' ? 'verified' : 'pending',
            payment: req.body.paymentMethod === 'cod',
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed", orderId: newOrder._id });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Placing User Order for Frontend using stripe
const placeOrderCod = async (req, res) => {

    try {
        if (!(await isWithinOpenHours())) {
            return res.status(403).json({ success: false, message: "We are currently closed. Please come back at 10am!" });
        }
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        res.json({ success: false, message: "Not  Verified" })
    }

}

const deleteOrder = async (req, res) => {
    try {
        await orderModel.findByIdAndDelete(req.body.orderId);
        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: "Error deleting order" });
    }
}

// Get daily delivered sales
const getDailySales = async (req, res) => {
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        const result = await orderModel.aggregate([
            { $match: { status: "Delivered", date: { $gte: start, $lte: end } } },
            { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
        ]);
        res.json({ success: true, total: result[0]?.total || 0, count: result[0]?.count || 0 });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

// Get monthly delivered sales
const getMonthlySales = async (req, res) => {
    try {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        const result = await orderModel.aggregate([
            { $match: { status: "Delivered", date: { $gte: start, $lte: end } } },
            { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
        ]);
        res.json({ success: true, total: result[0]?.total || 0, count: result[0]?.count || 0 });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

// Get yearly delivered sales
const getYearlySales = async (req, res) => {
    try {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        const result = await orderModel.aggregate([
            { $match: { status: "Delivered", date: { $gte: start, $lte: end } } },
            { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
        ]);
        res.json({ success: true, total: result[0]?.total || 0, count: result[0]?.count || 0 });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};

// Admin: verify or reject payment
const setPaymentStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body; // status: 'verified' or 'not_verified'
        await orderModel.findByIdAndUpdate(orderId, { paymentStatus: status });
        res.json({ success: true, message: `Payment marked as ${status}` });
    } catch (error) {
        res.json({ success: false, message: "Error updating payment status" });
    }
};

export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder, placeOrderCod, deleteOrder, getDailySales, getMonthlySales, getYearlySales, setPaymentStatus }