import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { getMyOrders } from "../controllers/ordersController.js";

const orderRouter = express.Router();

orderRouter.get('/getAllOrders' , verifyUser , getMyOrders)
orderRouter.post('/create-order', verifyUser, createOrder);

export default orderRouter