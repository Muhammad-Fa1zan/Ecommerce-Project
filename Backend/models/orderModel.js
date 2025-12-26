import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User',
        },
        orderItems: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                name: { type: String },
                quantity: { type: Number },
                price: { type: Number, immutable: true },
            },
        ],

        totalPrice: { type: Number, require: true },
        status: {
            type: String,
            status: {
                type: String,
                enum: ['PLACED', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
                default: 'PLACED'
            }

        }
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;