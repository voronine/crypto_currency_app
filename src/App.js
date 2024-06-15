import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import { fetchCurrencies } from './redux/actions/currencyActions';
import ValuesTable from './components/ValuesTable';
import ValuesChart from './components/ValuesChart';
import AddCurrencyModal from './components/AddCurrencyModal';
import styles from './styles/button.module.scss';

const App = () => {
    const [isCurrencyModalOpen, setCurrencyModalOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const dispatch = useDispatch();
    const currencies = useSelector((state) => state.currency.currencies);

    useEffect(() => {
        dispatch(fetchCurrencies());
    }, [dispatch]);

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
    };

    const handleAddCurrency = () => {
        setCurrencyModalOpen(true);
    };

    return (
        <Provider store={store}>
            <div className="App">
                {currencies.length === 0 ? (
                    <div className={styles.centeredContainer}>
                        <button className={styles.button} onClick={handleAddCurrency}>Add Currency</button>
                    </div>
                ) : (
                    <>
                        <Header 
                            onSelectCurrency={handleCurrencySelect} 
                            onAddCurrencyClick={handleAddCurrency} 
                            selectedCurrency={selectedCurrency}
                        />
                        {selectedCurrency && (
                            <div>
                                <ValuesChart currencyId={selectedCurrency._id} />
                                <ValuesTable currencyId={selectedCurrency._id} />
                            </div>
                        )}
                    </>
                )}
                <AddCurrencyModal isOpen={isCurrencyModalOpen} onRequestClose={() => setCurrencyModalOpen(false)} />
            </div>
        </Provider>
    );
};

export default App;
