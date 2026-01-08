import asyncHandler from 'express-async-handler';
import Cart from '../models/cartItemModel.js';
import Product from '../models/productsModel.js'
import Order from '../models/orderModel.js';

export const createOrder = asyncHandler(async (req, res) => {
   const UserId = req.user._id;

   const orderItems = [];

   const cart = await Cart.findOne({ user: UserId });

   if (!cart || cart.items.length === 0) {
      res.status(400);
      throw new Error('cart is empty ')
   }

   for (const item of cart.items) {
      const product = await Product.findById(item.product);

      if (!product) {
         res.status(404)
         throw new Error('Product not found')
      };

      if (product.stockCount < item.quantity) {
         res.status(400);
         throw new Error(`Not enough stock for ${product.name}`);
      }

      product.stockCount -= item.quantity;
      await product.save();

      orderItems.push({
         product: product._id,
         name: product.name,
         quantity: item.quantity,
         price: item.priceAtThatTime,
      });
   };

   const itemsPrices = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

   const taxPrice = 200;
   const shippingPrice = 150;

   const totalPrice = itemsPrices + taxPrice + shippingPrice;




   const orderCreated = await Order.create({
      user: UserId,
      orderItems,
      itemsPrices,
      taxPrice,
      shippingPrice,
      totalPrice,
   });

   await cart.deleteOne();

   res.status(201).json({
      message: "Order placed successfully",
      order: orderCreated,
   });

});

export const getMyOrders = asyncHandler( async (req , res) => {
   const USERID = req.user._id;
   const orders = await Order.find({user : USERID}).sort({createdAt : -1});
   res.status(200).json(orders);
})



