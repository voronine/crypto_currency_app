// src/components/EditValueModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updateValue } from '../redux/actions/valueActions';
import styles from '../styles/EditValueModal.module.scss';

const EditValueModal = ({ isOpen, onRequestClose, value }) => {
    const [amount, setAmount] = useState(value.amount);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateValue(value._id, { amount }));
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal} overlayClassName={styles.overlay}>
            <button onClick={onRequestClose} className={styles.closeButton}>✖</button>
            <h2 className={styles.heading}>Edit Value</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Amount in USDT:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required className={styles.input} />
                </label>
                <button type="submit" className={styles.button}>Save</button>
            </form>
        </Modal>
    );
};

export default EditValueModal;
