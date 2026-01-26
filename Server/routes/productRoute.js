import express from 'express';
import {
    createProducts,
    deleteProduct,
    getProducts,
    getSingleProduct,
    updateProduct
} from '../controllers/productContoller.js';
import { verifyUser } from '../middleware/verifyUser.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import upload from '../middleware/upload.js';

const productRouter = express.Router();

productRouter.post('/create-product', verifyUser, isAdmin, upload.single('image'), createProducts);
productRouter.put('/update-product/:id', verifyUser, isAdmin, upload.single('image'), updateProduct);
productRouter.delete('/delete-product/:id', verifyUser, isAdmin, deleteProduct);
productRouter.get('/products', getProducts);
productRouter.get('/single-product/:id', getSingleProduct)


export default productRouter;