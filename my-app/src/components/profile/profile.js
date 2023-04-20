import React, { useState, useEffect, useNavigate } from 'react';
import axios from 'axios';
import Navbar from "../Navbar/navbar";

function Profile() {
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  //const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    const customer_id = localStorage.getItem('id');
    
    if (!email || !customer_id) {
      setErrorMessage('Please log in to view your profile.');
      setIsLoading(false);
      return;
    }

    axios.get("http://localhost:3001/profile").then((res) => {
      const customer = res.data[0];
      if (!isLoading && customer && customer.customer_id === customer_id) {
        setCustomer(customer);
        setUpdatedCustomer(customer);
        setIsLoading(false);
      } else {
        setErrorMessage('Invalid Login credentials');
        setIsLoading(false);
      }
    }).catch((err) => {
      setErrorMessage('Error occurred while fetching user data');
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value
    }));
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const customer_id = localStorage.getItem('id');
    const { first_name, last_name, email, phone } = updatedCustomer;

    axios.put("http://localhost:3001/update", {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone
    }).then((res) => {
      const customer = res.data[0];
      setCustomer(customer);
      setUpdatedCustomer(customer);
      setIsEditing(false);
    }).catch(() => {
      setErrorMessage('Failed to save changes.');
    });
  };

  const handleDeleteClick = () => {
    setDeleteConfirmation('');
    axios.delete("http://localhost:3001/delete").then(() => {
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      window.location.href = '/login';
    }).catch(() => {
      setErrorMessage('Failed to delete account.');
    });
  };
  const handleDeleteConfirmationChange = (event) => {
    setDeleteConfirmation(event.target.value);
  };

  
  return (
    <>
      <Navbar />
      <div className="Profile">
        <h1>Profile</h1>
        <div>
          <label htmlFor="first_name">First Name</label>
          {isEditing ? (
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={updatedCustomer.first_name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{customer.first_name}</span>
          )}
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          {isEditing ? (
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={updatedCustomer.last_name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{customer.last_name}</span>
          )}
        </div>
        <div>
         

        <label htmlFor="email">Email</label>
        {isEditing ? (
        <input
                  type="text"
                  id="email"
                  name="email"
                  value={updatedCustomer.email}
                  onChange={handleInputChange}
                />
        ) : (
        <span>{customer.email}</span>
        )}
        </div>
        <div>
        <label htmlFor="phone">Phone</label>
        {isEditing ? (
        <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={updatedCustomer.phone}
                  onChange={handleInputChange}
                />
        ) : (
        <span>{customer.phone}</span>
        )}
        </div>
        {isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
        ) : (
        <button onClick={handleEditClick}>Edit</button>
        )}
        <div>
        <label htmlFor="deleteConfirmation">Type "DELETE" to confirm account deletion:</label>
        <input type="text" id="deleteConfirmation" name="deleteConfirmation" value={deleteConfirmation} onChange={handleDeleteConfirmationChange} />
        </div>
        {deleteConfirmation === 'DELETE' && (
        <button onClick={handleDeleteClick}>Delete Account</button>
        )}
        </div>
        </>
);
}

export default Profile;