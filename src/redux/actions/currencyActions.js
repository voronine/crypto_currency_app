// src/redux/actions/currencyActions.js
export const addCurrency = (currency) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5000/api/currency/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currency),
        });
        const data = await response.json();
        dispatch({ type: 'ADD_CURRENCY', payload: data });
    } catch (error) {
        console.error('Error adding currency:', error);
    }
};

export const fetchCurrencies = () => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5000/api/currency/all');
        const data = await response.json();
        dispatch({ type: 'SET_CURRENCIES', payload: data });
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
};

export const fetchCurrencyPrice = (symbol) => async (dispatch) => {
    try {
        const apiKey = 'c76a0662d789bc11a7d2a889343ae001d9b7beca7d93327c57ab504efebf5e90';
        const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USDT&api_key=${apiKey}`);
        const data = await response.json();
        dispatch({ type: 'SET_CURRENCY_PRICE', payload: { symbol, price: data.USDT } });
    } catch (error) {
        console.error('Error fetching currency price:', error);
    }
};

export const addValue = (value) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5000/api/value/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        });

        if (!response.ok) {
            throw new Error('Failed to add value');
        }

        const data = await response.json();
        dispatch({ type: 'ADD_VALUE', payload: data });
    } catch (error) {
        console.error('Error adding value:', error);
        throw error; 
    }
};

export const fetchValues = (currencyId) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:5000/api/value/${currencyId}`);
        const data = await response.json();
        dispatch({ type: 'SET_VALUES', payload: data });
    } catch (error) {
        console.error('Error fetching values:', error);
    }
};

export const deleteValue = (id) => async (dispatch) => {
    try {
        await fetch(`http://localhost:5000/api/value/${id}`, {
            method: 'DELETE',
        });
        dispatch({ type: 'DELETE_VALUE', payload: id });
    } catch (error) {
        console.error('Error deleting value:', error);
    }
};
