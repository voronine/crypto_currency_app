// src/redux/actions/valueActions.js
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

export const updateValue = (id, updatedValue) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:5000/api/value/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedValue),
        });
        
        if (!response.ok) {
            throw new Error('Failed to update value');
        }

        const data = await response.json();
        dispatch({ type: 'UPDATE_VALUE', payload: data });
    } catch (error) {
        console.error('Error updating value:', error);
    }
};