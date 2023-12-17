import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotAuthorized from '../../../../Pharmacy_Team03/frontend/src/components/NotAuthorized';

const PharmacistAuthorization = (WrappedComponent) => {

  const PharmacistAuthorization = (props) => {
    const [showContent, setShowContent] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const userToken = localStorage.getItem('userToken');

      if (!userToken) {
        navigate('/login');
      } else {
        axios
          .get('/loginAuthentication')
          .then((response) => {
            const { success, type , user } = response.data;

            if (success) {
              if (type === 'pharmacist') {
                setShowContent(true);
                setUser(user); 
              } else {
                setShowContent(false);
              }
            } else {
              navigate('/login');
            }
          })
          .catch((error) => {
            console.error('User authentication error:', error);
            navigate('/login');
          });
      }
    }, [navigate]);

    return (
      <div>
        {showContent ? <WrappedComponent {...props} user={user} /> : <NotAuthorized />}
      </div>
    );
  };

  return PharmacistAuthorization;
};



export default PharmacistAuthorization;
