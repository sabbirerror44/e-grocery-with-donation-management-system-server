const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
    donerInfo: {
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
    organizationName: {
            type: String,
            required: true
    },
    donatedProducts: [
        {
            _id: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true
            },
            donation: {
                type: Number,
                required: true
            }

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
        enum: ['pending', 'delivered', 'received'],
        default: "pending",
    }
},
    {
        timestamps: true,
    }
)

const Donation = mongoose.model('donation', donationSchema);

module.exports = Donation;