import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchCurrencies, deleteCurrency } from '../redux/actions/currencyActions';
import CurrencyPrice from './CurrencyPrice';
import AddValueModal from './AddValueModal';
import styles from '../styles/header.module.scss';

const customStyles = {
    control: (provided) => ({
        ...provided,
        borderRadius: '10px 10px 0 0',
        backgroundColor: '#666',
        border: 'none',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center'
    }),
    singleValue: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff'
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '0 0 10px 10px',
        backgroundColor: '#666',
        color: '#ffffff'
    }),
    option: (provided, state) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: state.isSelected ? '#555' : state.isFocused ? '#555' : '#666',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#555'
        }
    })
};

const Header = ({ onSelectCurrency, onAddCurrencyClick, selectedCurrency }) => {
    const dispatch = useDispatch();
    const currencies = useSelector((state) => state.currency.currencies);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [isValueModalOpen, setValueModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCurrencies());
    }, [dispatch]);

    useEffect(() => {
        if (currencies.length > 0 && !selectedCurrency) {
            onSelectCurrency(currencies[0]);
        }
    }, [currencies, selectedCurrency, onSelectCurrency]);

    const handleCurrencyChange = (selectedOption) => {
        if (selectedOption.value === 'add-new') {
            handleAddCurrency();
        } else {
            onSelectCurrency(selectedOption.value);
        }
        setMenuIsOpen(false);
    };

    const handleDeleteCurrency = async (currencyId) => {
        await dispatch(deleteCurrency(currencyId));
        dispatch(fetchCurrencies());
    };

    const handleAddCurrency = async () => {
        const newCurrency = await onAddCurrencyClick();
        if (newCurrency) {
            onSelectCurrency(newCurrency);
            dispatch(fetchCurrencies());
        }
    };

    const currencyOptions = [
        {
            value: 'add-new',
            label: (
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                    + Add New
                </div>
            ),
        },
        ...currencies.map((currency) => ({
            value: currency,
            label: (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span>{currency.name}</span>
                    {menuIsOpen && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteCurrency(currency._id); }} 
                            style={{ marginLeft: 'auto', backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
                        >
                            Delete
                        </button>
                    )}
                </div>
            ),
        })),
    ];

    return (
        <div className={styles.header}>
            <Select
                className={styles['select-container']}
                styles={customStyles}
                options={currencyOptions}
                onChange={handleCurrencyChange}
                onMenuOpen={() => setMenuIsOpen(true)}
                onMenuClose={() => setMenuIsOpen(false)}
                placeholder="Select a currency..."
                value={selectedCurrency ? {
                    value: selectedCurrency,
                    label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {selectedCurrency.name}
                        </div>
                    )
                } : null}
            />
            <div className={styles.price}>
                {selectedCurrency ? (
                    <CurrencyPrice symbol={selectedCurrency.name} />
                ) : (
                    'N/A'
                )}
            </div>
            <button 
                onClick={() => setValueModalOpen(true)} 
                className={styles['add-values-button']}
            >
                Add Value
            </button>
            {selectedCurrency && (
                <AddValueModal 
                    isOpen={isValueModalOpen} 
                    onRequestClose={() => setValueModalOpen(false)} 
                    currencyId={selectedCurrency._id} 
                />
            )}
        </div>
    );
};

export default Header;
