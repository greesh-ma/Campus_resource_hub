import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import AddResourceForm from '../components/AddResourceForm';

function AddResource() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="page">
      <div className="page-content">
        <div className="container">
          <AddResourceForm />
        </div>
      </div>
    </div>
  );
}

export default AddResource;
