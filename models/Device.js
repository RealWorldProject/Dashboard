const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: Boolean,
    cart: {
        items: [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId;
                    ref: 'Product',
                    required: true
                },
                quantity: { type: Number, required: true}
            }
        ]
    }
})

module.exports = mongoose.model('Device', deviceSchema);