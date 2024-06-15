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

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            padding: '20px',
            position: 'relative'
        },
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <button onClick={onRequestClose} style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
            }}>✖</button>
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
