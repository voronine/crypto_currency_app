// src/redux/reducers/currencyReducer.js
const initialState = {
    currencies: [],
    prices: {},
};

const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CURRENCY':
            return { ...state, currencies: [...state.currencies, action.payload] };
        case 'SET_CURRENCIES':
            return { ...state, currencies: action.payload };
        case 'SET_CURRENCY_PRICE':
            return { ...state, prices: { ...state.prices, [action.payload.symbol]: action.payload.price } };
        default:
            return state;
    }
};

export default currencyReducer;
