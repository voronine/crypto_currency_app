// src/components/CurrencyPrice.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencyPrice } from '../redux/actions/currencyActions';

const CurrencyPrice = ({ symbol }) => {
    const dispatch = useDispatch();
    const price = useSelector((state) => state.currency.prices[symbol]);

    useEffect(() => {
        if (symbol) {
            dispatch(fetchCurrencyPrice(symbol));
        }
    }, [dispatch, symbol]);

    return (
        <div>
            <h2>Current Price</h2>
            <p>{price ? `Price of ${symbol}: ${price}` : 'Loading...'}</p>
        </div>
    );
};

export default CurrencyPrice;
