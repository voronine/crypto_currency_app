// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import AddCurrencyModal from './AddCurrencyModal';
import { fetchCurrencies, deleteCurrency } from '../redux/actions/currencyActions';

const Header = ({ onSelectCurrency }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const currencies = useSelector((state) => state.currency.currencies);

    useEffect(() => {
        dispatch(fetchCurrencies());
    }, [dispatch]);

    const handleCurrencyChange = (selectedOption) => {
        onSelectCurrency(selectedOption.value);
    };

    const handleDeleteCurrency = async (currencyId) => {
        await dispatch(deleteCurrency(currencyId));
        dispatch(fetchCurrencies());
    };

    const currencyOptions = currencies.map((currency) => ({
        value: currency,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={currency.image} alt={currency.name} width="20" style={{ marginRight: 10 }} />
                {currency.name}
                <button onClick={(e) => { e.stopPropagation(); handleDeleteCurrency(currency._id); }} style={{ marginLeft: 'auto' }}>Delete</button>
            </div>
        ),
    }));

    return (
        <div className="header">
            <h1>Currency Tracker</h1>
            <button onClick={() => setModalOpen(true)}>Add Currency</button>
            <AddCurrencyModal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)} />
            <Select
                options={currencyOptions}
                onChange={handleCurrencyChange}
                placeholder="Select a currency..."
            />
        </div>
    );
};

export default Header;
