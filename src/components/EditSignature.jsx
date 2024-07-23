// src/components/Signature/EditSignature.js
import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

const EditSignature = ({ userRole, userId }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignature = async () => {
      try {
        const response = await axios.get(`http://backend.test/api/signature/${id}`);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching signature:', error);
      }
    };

    fetchSignature();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (userRole !== 'admin' && formData.user_id !== userId) {
    return <Redirect to="/unauthorized" />;
  }

  return (
    <div>
      {/* Render the edit form */}
    </div>
  );
};

export default EditSignature;
