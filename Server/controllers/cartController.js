import asyncHandler from 'express-async-handler'
import Cart from '../models/cartItemModel.js';
import Product from '../models/productsModel.js';


export const getCart = asyncHandler(async (req, res) => {
    const userID = req.user._id;
    const cart = await Cart.findOne({ user: userID }).populate('items.product');
    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }
    res.status(200).json({cart});
});

export const addtoCart = asyncHandler(async (req, res) => {
    const userID = req.user._id;
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    let cart = await Cart.findOne({ user: userID });

    if (!cart) {
        if (product.stockCount < quantity) {
            res.status(400);
            throw new Error('Not enough stock');
        }

        cart = new Cart({
            user: userID,
            items: [{
                product: productId,
                quantity,
                priceAtThatTime: product.price,
            }],
        });
    } else {
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId.toString()
        );

        if (itemIndex > -1) {
            const newQty = cart.items[itemIndex].quantity + quantity;

            if (product.stockCount < newQty) {
                res.status(400);
                throw new Error('Not enough stock');
            }

            cart.items[itemIndex].quantity = newQty;
        } else {
            if (product.stockCount < quantity) {
                res.status(400);
                throw new Error('Not enough stock');
            }

            cart.items.push({
                product: productId,
                quantity,
                priceAtThatTime: product.price,
            });
        }
    }

    cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.quantity * item.priceAtThatTime,
        0
    );

    await cart.save();
    res.status(200).json(cart);
});


export const removeItem = asyncHandler(async (req, res) => {

    const userID = req.user._id;

    let cart = await Cart.findOne({ user: userID });

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== req.params.id);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.priceAtThatTime, 0);

    await cart.save();
    res.status(200).json(cart);
});

export const removeAllItems = asyncHandler(async (req, res) => {
    const userID = req.user._id;

    const cart = await Cart.findOneAndDelete({ user: userID });

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    res.status(200).json({ message: 'Cart cleared' });
})


