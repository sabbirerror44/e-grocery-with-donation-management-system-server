const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userInfo: {
        name: {
            type: String,
            required: true
        },
        mobileNo: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true
        }
    },
    invoiceNo: {
        type: String,
        required: true
    },
    products: [{
        _id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        donation: {
            type: Number,
            required: true
        },
    }
    ],
    price: {
        totalPrice: {
            type: Number,
            required: true
        }
    },
    payment: {
        paymentMethod: {
            type: String,
            required: true
        },
        TransactionId: {
            type: String
        }
    },
    status: {
        type: String,
        enum: ['processing', 'delivered'],
        default: "processing",
    }
},
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;