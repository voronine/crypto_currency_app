// src/components/ValuesTable.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchValues, deleteValue } from '../redux/actions/valueActions';

const ValuesTable = ({ currencyId }) => {
    const dispatch = useDispatch();
    const values = useSelector((state) => state.value.values);

    useEffect(() => {
        dispatch(fetchValues(currencyId));
    }, [dispatch, currencyId]);

    const handleDelete = (id) => {
        dispatch(deleteValue(id));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Amount in USDT</th>
                    <th>Time</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {values.map((value) => (
                    <tr key={value._id}>
                        <td>{value.amount}</td>
                        <td>{new Date(value.time).toLocaleString()}</td>
                        <td>
                            <button onClick={() => handleDelete(value._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ValuesTable;
