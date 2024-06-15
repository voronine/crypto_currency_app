import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchValues, deleteValue } from '../redux/actions/valueActions';
import EditValueModal from './EditValueModal';
import styles from '../styles/valuesTable.module.scss';

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
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Amount in USD</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {values.map((value) => (
                        <tr key={value._id}>
                            <td>{value.amount}</td>
                            <td>{new Date(value.time).toLocaleString()}</td>
                            <td className={styles.actions}>
                                <button className={styles.editButton} onClick={() => handleEdit(value)}>EDIT</button>
                                <button className={styles.deleteButton} onClick={() => handleDelete(value._id)}>DELETE</button>
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
