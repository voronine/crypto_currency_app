import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { updateValue } from '../redux/actions/valueActions';

const EditValueModal = ({ isOpen, onRequestClose, value }) => {
    const [amount, setAmount] = useState(value.amount);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateValue(value._id, { amount }));
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Edit Value</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Amount in USDT:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </label>
                <button type="submit">Save</button>
            </form>
        </Modal>
    );
};

export default EditValueModal;
