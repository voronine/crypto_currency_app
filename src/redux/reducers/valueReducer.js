// src/redux/reducers/valueReducer.js
const initialState = {
    values: [],
};

const valueReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_VALUE':
            return { ...state, values: [...state.values, action.payload] };
        case 'SET_VALUES':
            return { ...state, values: action.payload };
        case 'DELETE_VALUE':
            return {
                ...state,
                values: state.values.filter((value) => value._id !== action.payload),
            };
        default:
            return state;
    }
};

export default valueReducer;
