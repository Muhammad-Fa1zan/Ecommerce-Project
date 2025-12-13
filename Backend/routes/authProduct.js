import express from 'express';
import {
    createProducts,
    deleteProduct,
    getProducts,
    getSingleProduct,
    updateProduct
} from '../controllers/productContoller';


const productRouter = express.Router();

productRouter.post('/create-product', createProducts);
productRouter.put('/update-product', updateProduct);
productRouter.delete('/delete-product', deleteProduct);
productRouter.get('/Products', getProducts);
productRouter.get('single-product', getSingleProduct)


export default productRouter;