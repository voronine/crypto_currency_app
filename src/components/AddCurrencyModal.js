// src/components/AddCurrencyModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addCurrency } from '../redux/actions/currencyActions';

const AddCurrencyModal = ({ isOpen, onRequestClose }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCurrency({ name, image }));
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Add Currency</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Image URL:
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
                </label>
                <button type="submit">Save</button>
            </form>
        </Modal>
    );
};

export default AddCurrencyModal;
