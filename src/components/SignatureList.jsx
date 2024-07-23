import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SignatureList = () => {
  const [signatures, setSignatures] = useState([]);

  useEffect(() => {
    const fetchSignatures = async () => {
      try {
        const response = await axios.get('http://backend.test/api/signatures'); // Adjust the API endpoint
        setSignatures(response.data);
      } catch (error) {
        console.error('Error fetching signatures:', error);
      }
    };

    fetchSignatures();
  }, []);

  return (
    <div>
      <h2>Manage Signatures</h2>
      <ul>
        {signatures.map((signature) => (
          <li key={signature.id}>{signature.name} - {signature.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default SignatureList;
