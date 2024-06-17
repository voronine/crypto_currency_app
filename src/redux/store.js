import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import currencyReducer from './reducers/currencyReducer';
import valueReducer from './reducers/valueReducer';

const rootReducer = combineReducers({
    currency: currencyReducer,
    value: valueReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
