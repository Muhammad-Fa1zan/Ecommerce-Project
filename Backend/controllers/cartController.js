import asyncHandler from 'express-async-handler'
import Cart from '../models/cartItem';
import Product from '../models/products.js'

export const addtoCart = asyncHandler(async (req, res) => {

    const userID = req.user._id;
    const { productId, quantity } = req.body;

    let qty = quantity || 1;

    const product = await Product.findById(productId);

    if (!product) {
        res.status(404);
        throw new Error('product not found')
    }

    if (product.stockCount < qty) {
        res.status(400);
        throw new Error('product is out of stock')
    }

    let cart = await Cart.findOne({ user: userID });

    if (!cart) {
        cart = new Cart({
            user: userID,
            item: [{
                product: productId,
                quantity: qty,
                priceAtThatTime: product.price,
            }],
        })
    }
    else {
        const itemIndex = cart.findIndex((item) => item.Product.toString() === productId);
        if (itemIndex > -1) {
            cart = cart[itemIndex].quantity += qty;
        }
        else {
            cart.item.push({
                product: productId,
                quantity: qty,
                priceAtThatTime: product.price,
            })
        }
    };

    cartItem.totalPrice = cart.item.reduce((acc, item) => acc + item.quantity * item.priceAtThatTime);

    await cartItem.save();

    res.status(200).json(cart);

});

export const removeItem = asyncHandler(async (req, res) => {

    const userID = req.user._id;
    const { productId } = req.body;

    let cart = await findOne({ user: userID });

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.priceAtThatTime, 0);

    await cart.save();
    res.status(200).json(cart);
});


