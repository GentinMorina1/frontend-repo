// src/components/AdminPanel.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignatures, fetchUsers} from '../features/admin/adminSlice'; // Adjust path if needed

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { signatures, isLoading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchSignatures());
    dispatch(fetchUsers());
    dispatch(fetchMetrics());
  }, [dispatch]);

  return (
    <div>
      <h1>Admin Panel</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Signatures</h2>
      <ul>
        {signatures.map((signature) => (
          <li key={signature.id}>{signature.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
