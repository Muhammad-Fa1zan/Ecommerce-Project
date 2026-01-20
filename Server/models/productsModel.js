import mongoose from "mongoose";


const productSchema = mongoose.Schema(
    {
        user : {type : mongoose.Schema.Types.ObjectId , require : true , ref : 'User'},
        name: { type: String, require: true },
        description: { type: String, require: true },
        price: { type: Number, require: true },
        stockCount: { type: Number, require: true, default: 0 },
        image: { type: String , require: true },
        category: { type: String },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;