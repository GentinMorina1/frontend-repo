// src/components/ProfileSettings.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const ProfileSettings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(updateProfile({ email, password }));
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default ProfileSettings;
