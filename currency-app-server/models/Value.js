const mongoose = require('mongoose');

const ValueSchema = new mongoose.Schema({
    currency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency', required: true },
    amount: { type: Number, required: true },
    time: { type: Date, required: true },
});

module.exports = mongoose.model('Value', ValueSchema);