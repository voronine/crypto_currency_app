// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCurrencyModal from './AddCurrencyModal';
import { fetchCurrencies } from '../redux/actions/currencyActions';

const Header = ({ onSelectCurrency }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const currencies = useSelector((state) => state.currency.currencies);

    useEffect(() => {
        dispatch(fetchCurrencies());
    }, [dispatch]);

    return (
        <div className="header">
            <h1>Currency Tracker</h1>
            <button onClick={() => setModalOpen(true)}>Add Currency</button>
            <AddCurrencyModal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)} />
            <ul>
                {currencies.map((currency) => (
                    <li key={currency._id} onClick={() => onSelectCurrency(currency)}>
                        {currency.name} <img src={currency.image} alt={currency.name} width="50" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Header;
