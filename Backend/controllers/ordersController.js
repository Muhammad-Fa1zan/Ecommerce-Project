import asyncHandler from 'express-async-handler';
import Cart from '../models/cartItemModel.js';

export const orderNow = asyncHandler(async (req, res) => {
   const UserId = req.user._id;

   const cart = await Cart.findOne({ user: UserId });

   if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
   }
});



