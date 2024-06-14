// routes/currency.js
const express = require('express');
const router = express.Router();
const Currency = require('../models/Currency');

router.post('/add', async (req, res) => {
    const { name, image } = req.body;
    const newCurrency = new Currency({ name, image });
    try {
        await newCurrency.save();
        res.status(201).json(newCurrency);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const currencies = await Currency.find();
        res.status(200).json(currencies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;