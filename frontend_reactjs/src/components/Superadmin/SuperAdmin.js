import React, { useState, useEffect } from 'react';
import { getAllData, deleteData, patchData, putData } from '../../utils/CrudApi';
import EditModal from './EditModal';
import '../../styles/superadmin.css';

// Super Admin Component
const SuperAdmin = () => {
  const [responses, setResponses] = useState([]); // State for responses data
  const [selectedRows, setSelectedRows] = useState([]); // State for selected rows
  const [selectedMessage, setSelectedMessage] = useState(null); // State for selected message 
  const [showEditModal, setShowEditModal] = useState(false); // State for showing edit modal
  const [editingResponse, setEditingResponse] = useState(null); // State for response being edited

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const data = await getAllData();
      // Format the data
      const formattedData = data.map((item, index) => ({
        ...item,
        uniqueId: item.id,
        checked: item.status === "active", // Assuming 'active' represents true status
        rowNumber: index + 1 // Assuming you have a 'rowNumber' field in your data
      }));
      setResponses(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Toggle selected rows
  const toggleRow = (uniqueId) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(uniqueId)
        ? prevSelectedRows.filter((id) => id !== uniqueId)
        : [...prevSelectedRows, uniqueId]
    );
  };

  // Delete selected rows
  const deleteSelectedRows = async () => {
    try {
      await Promise.all(
        selectedRows.map((uniqueId) => deleteData(uniqueId))
      );
      fetchData(); // Refresh the data after deletion
      setSelectedRows([]); // Clear the selected rows
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Toggle status of a row
  const toggleStatus = async (uniqueId, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Toggle the current status
      const response = await patchData(uniqueId, { status: newStatus }); // Send PATCH request
      console.log('Toggled status for uniqueId:', uniqueId, 'New status:', newStatus, 'Response:', response); // Log the newStatus, uniqueId, and response

      // Update the local state with the new status
      setResponses(prevResponses =>
        prevResponses.map(response =>
          response.uniqueId === uniqueId ? { ...response, status: newStatus } : response
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Show message popup
  const showMessagePopup = (message) => {
    setSelectedMessage(message);
  };

  // Hide message popup
  const hideMessagePopup = () => {
    setSelectedMessage(null);
  };  

  // Open edit modal for a response
  const openEditModal = (response) => {
    setEditingResponse(response);
    setShowEditModal(true);
  };

  // Hide edit modal
  const hideEditModal = () => {
    setEditingResponse(null);
    setShowEditModal(false);
  };

  // Update response data
  const updateResponse = async (updatedResponse) => {
    try {
      await putData(updatedResponse.uniqueId, updatedResponse);
      fetchData(); // Refresh the data after updation
      setSelectedRows([]);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="super-admin-page">
      <main>
        <header>
          <h1>Super Admin Dashboard</h1>
        </header>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedRows.length === responses.length}
                    onChange={() =>
                      setSelectedRows(
                        selectedRows.length === responses.length
                          ? []
                          : responses.map((response) => response.uniqueId)
                      )
                    }
                  />
                </th>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
                <th style={{ display: 'none' }}>Unique ID</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response, index) => (
                <tr key={response.rowNumber}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(response.uniqueId)}
                      onChange={() => toggleRow(response.uniqueId)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{response.name}</td>
                  <td>{response.email}</td>
                  <td><button onClick={() => showMessagePopup(response.message)}>View</button></td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={response.status}
                        onChange={() => toggleStatus(response.uniqueId, response.status)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td><button onClick={() => openEditModal(response)}>Edit</button></td>
                  <td style={{ display: 'none' }}>{response.uniqueId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-container">
          <button onClick={deleteSelectedRows}>Delete Selected</button>
        </div>
      </main>
      {showEditModal && (
        <EditModal
          response={editingResponse}
          onClose={hideEditModal}
          onUpdate={updateResponse}
        />
      )}

      {/* Message Popup */}
      {selectedMessage && (
        <div className="message-popup">
          <div className="message-popup-content">
            <span className="close" onClick={hideMessagePopup}>
              &times;
            </span>
            <p>{selectedMessage}</p>
          </div>
        </div>
      )}      
    </div>
  );
};

export default SuperAdmin;
