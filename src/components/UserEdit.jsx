// src/components/UserEdit.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/admin/adminSlice';

const UserEdit = ({ userId }) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(updateUser({ id: userId, name }));
  };

  return (
    <div>
      <h2>Edit User</h2>
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default UserEdit;
