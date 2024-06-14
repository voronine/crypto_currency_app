// src/components/AddValueModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addValue } from '../redux/actions/valueActions';

const AddValueModal = ({ isOpen, onRequestClose, currencyId }) => {
    const [amount, setAmount] = useState('');
    const [time, setTime] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addValue({ currency: currencyId, amount, time }));
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Add Value</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Amount in USDT:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </label>
                <label>
                    Time:
                    <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} required />
                </label>
                <button type="submit">Save</button>
            </form>
        </Modal>
    );
};

export default AddValueModal;
