import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: { type: String, recquired: true },
        qty: { type: Number, recquired: true },
        image: { type: String, recquired: true },
        price: { type: Number, recquired: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', recquired: true },

    }],
    shippingAddress: {
        fullName: { type: String, recquired: true },
        address: { type: String, recquired: true },
        city: { type: String, recquired: true },
        postalCode: { type: String, recquired: true },
        country: { type: String, recquired: true },
    },
    paymentMethod: { type: String, recquired: true },
    itemsPrice: { type: Number, recquired: true },
    shippingPrice: { type: Number, recquired: true },
    taxPrice: { type: Number, recquired: true },
    totalPrice: { type: Number, recquired: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', recquired: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }
}, {
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema)
export default Order