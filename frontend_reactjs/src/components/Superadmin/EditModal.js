import React, { useState } from 'react';
import { putData } from '../../utils/CrudApi';
import '../../styles/superadmin.css';

// Edit Modal Component
const EditModal = ({ response, onClose }) => {
  const [editedResponse, setEditedResponse] = useState({ ...response });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedResponse((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited data
  const handleSave = async () => {
    try {
      await putData(editedResponse.uniqueId, editedResponse);
      onClose(); // Close the modal
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Data</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedResponse.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={editedResponse.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={editedResponse.message}
            onChange={handleChange}
          />
        </div>
        <button className="btn-save" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditModal;

