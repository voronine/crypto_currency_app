import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchValues, deleteValue } from '../redux/actions/valueActions';
import EditValueModal from './EditValueModal';

const ValuesTable = ({ currencyId }) => {
    const dispatch = useDispatch();
    const values = useSelector((state) => state.value.values);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        dispatch(fetchValues(currencyId));
    }, [dispatch, currencyId]);

    const handleDelete = (id) => {
        dispatch(deleteValue(id));
    };

    const handleEdit = (value) => {
        setSelectedValue(value);
        setEditModalOpen(true);
    };

    return (
        <>
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
                                <button onClick={() => handleEdit(value)}>Edit</button>
                                <button onClick={() => handleDelete(value._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedValue && (
                <EditValueModal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setEditModalOpen(false)}
                    value={selectedValue}
                />
            )}
        </>
    );
};

export default ValuesTable;
