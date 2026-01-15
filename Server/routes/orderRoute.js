import express from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { createOrder, getAllOrders, getMyOrders, orderStatusUpdate, payOrder } from "../controllers/ordersController.js";

const orderRouter = express.Router();

orderRouter.get('/get-my-orders', verifyUser, getMyOrders)
orderRouter.get('/get-all-order' , verifyUser , isAdmin , getAllOrders)
orderRouter.post('/create-order', verifyUser, createOrder);
orderRouter.put('/:orderId/status', verifyUser , isAdmin ,  orderStatusUpdate )
orderRouter.put('/:id/pay', verifyUser , payOrder )

export default orderRouter