// src/App.js
import React, { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import { fetchCurrencies } from './redux/actions/currencyActions';
import CurrencyPrice from './components/CurrencyPrice';
import ValuesTable from './components/ValuesTable';
import ValuesChart from './components/ValuesChart';
import AddValueModal from './components/AddValueModal';

const App = () => {
    const [isValueModalOpen, setValueModalOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrencies());
    }, [dispatch]);

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
    };

    return (
        <Provider store={store}>
            <div className="App">
                <Header onSelectCurrency={handleCurrencySelect} />
                {selectedCurrency && (
                    <div>
                        <CurrencyPrice symbol={selectedCurrency.name} />
                        <button onClick={() => setValueModalOpen(true)}>Add Value</button>
                        <AddValueModal isOpen={isValueModalOpen} onRequestClose={() => setValueModalOpen(false)} currencyId={selectedCurrency._id} />
                        <ValuesTable currencyId={selectedCurrency._id} />
                        <ValuesChart currencyId={selectedCurrency._id} />
                    </div>
                )}
            </div>
        </Provider>
    );
};

export default App;
