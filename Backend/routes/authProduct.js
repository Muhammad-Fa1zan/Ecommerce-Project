import express from 'express';
import {
    createProducts,
    deleteProduct,
    getProducts,
    getSingleProduct,
    updateProduct
} from '../controllers/productContoller';
import { verifyUser } from '../middleware/verifyUser';
import { isAdmin } from '../middleware/adminMiddleware';


const productRouter = express.Router();

productRouter.post('/create-product/:id', verifyUser, isAdmin, createProducts);
productRouter.put('/update-product/:id', verifyUser, isAdmin, updateProduct);
productRouter.delete('/delete-product/:id', verifyUser, isAdmin, deleteProduct);
productRouter.get('/products', getProducts);
productRouter.get('/single-product', getSingleProduct)


export default productRouter;