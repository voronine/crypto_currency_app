// routes/value.js
const express = require('express');
const router = express.Router();
const Value = require('../models/Value');

router.post('/add', async (req, res) => {
    const { currency, amount, time } = req.body;
    const newValue = new Value({ currency, amount, time });
    try {
        await newValue.save();
        res.status(201).json(newValue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:currencyId', async (req, res) => {
    try {
        const values = await Value.find({ currency: req.params.currencyId }).sort({ time: 1 });
        res.status(200).json(values);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedValue = await Value.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedValue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Value.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Value deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;