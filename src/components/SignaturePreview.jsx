import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SignaturePreview = ({ userId }) => {
    const [signature, setSignature] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) {
            setError(new Error('User ID is required'));
            setLoading(false);
            return;
        }

        const fetchSignature = async () => {
            try {
                const response = await axios.get(`http://backend.test/api/signatures/${userId}`);
                setSignature(response.data.signature);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSignature();
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="signature-preview">
            {signature ? (
                <div>
                    <h2>{signature.name} {signature.last_name}</h2>
                    <p>{signature.title}</p>
                    <p>{signature.company}</p>
                    <p>{signature.email}</p>
                    <p>{signature.phone}</p>
                    <p>{signature.description}</p>
                    {signature.image && <img src={`/storage/images/${signature.image}`} alt="Signature" />}
                </div>
            ) : (
                <div>No signature found.</div>
            )}
        </div>
    );
};

export default SignaturePreview;
