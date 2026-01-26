import asyncHandler from 'express-async-handler'
import Product from '../models/productsModel.js'


export const createProducts = asyncHandler(async (req, res) => {

    const { name, description, price, stockCount, category } = req.body;

    const image = req.file ? `/uploads/products/${req.file.filename}` : null

    if (!name || !description || !category) {
        res.status(401);
        throw new Error("Please provide all required fields");
    };

    const product = new Product(
        {
            name,
            description,
            price,
            stockCount,
            image,
            category,
        },
    );

    const CreatedProduct = await product.save();

    return res.status(200).json({ CreatedProduct, messsage: 'Product Created' })
})

export const updateProduct = asyncHandler(async (req, res) => {

    const { name, description, price, stockCount, category } = req.body;
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    };

    product.name = name || product.name;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;
    if (stockCount !== undefined) product.stockCount = stockCount;
    if (price !== undefined) product.price = price;
    if (req.file) product.image = `/uploads/products/${req.file.filename}`


    const updatedProduct = await product.save();

    return res.status(200).json({ updatedProduct, messsage: 'Product Updated' })


});

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    };

    await product.deleteOne();


    res.status(200).json({ messsage: "Product Delete" })
})


export const getProducts = asyncHandler(async (req, res) => {

    let filter = {};

    if (req.query.category) {
        filter.category = req.query.category
    };

    if (req.query.maxPrice || req.query.minPrice) {
        filter.price = {};
    }

    if (req.query.maxPrice) {
        filter.price.$lte = Number(req.query.maxPrice);
    }
    if (req.query.minPrice) {
        filter.price.$gte = Number(req.query.minPrice);
    }

    if (req.query.search) {
        filter.name = {
            $regex: req.query.search,
            $options: 'i',
        }
    }



    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const products = await Product.find(filter).limit(limit).skip(skip).sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments(filter);
    const totalPage = Math.ceil(totalProducts / limit);


    return res.status(200).json({
        products,
        totalPage,
        totalProducts,
        limit,
        skip,
    });
});

export const getSingleProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        res.status(401)
        throw new Error('Product not found')
    };

    return res.status(200).json({product});

})