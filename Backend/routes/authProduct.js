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


const productRouter = express.Router();

productRouter.post('/create-product', verifyUser, isAdmin, createProducts);
productRouter.put('/update-product/:id', verifyUser, isAdmin, updateProduct);
productRouter.delete('/delete-product/:id', verifyUser, isAdmin, deleteProduct);
productRouter.get('/products', getProducts);
productRouter.get('/single-product', getSingleProduct)


export default productRouter;