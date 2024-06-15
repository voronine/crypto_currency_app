// src/components/AddCurrencyModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addCurrency } from '../redux/actions/currencyActions';
import styles from '../styles/addCurrencyModal.module.scss';

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
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2 className={styles.header}>Add Currency</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Image URL:
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
                <button type="submit" className={styles.button}>Save</button>
            </form>
        </Modal>
    );
};

export default AddCurrencyModal;
