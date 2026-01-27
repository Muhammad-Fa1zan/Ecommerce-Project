import express from 'express';
import {
    getCart,
    addtoCart,
    removeItem,
    removeAllItems
} from '../controllers/cartController.js';
import { verifyUser } from '../middleware/verifyUser.js';

const cartRouter = express.Router();

cartRouter.get('/get-cart', verifyUser, getCart);
cartRouter.post('/add-to-cart', verifyUser, addtoCart);
cartRouter.delete('/remove-item/:id', verifyUser, removeItem);
cartRouter.delete('/remove-all-items', verifyUser, removeAllItems);

export default cartRouter