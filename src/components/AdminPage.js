import React, { useState } from 'react';

// Sample form responses data
const formResponses = [
  { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Hello, this is a sample message.', status: 'New' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Hi, I have a question about your services.', status: 'New' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', message: 'I would like to request a quote.', status: 'Responded' },
];

const AdminPage = () => {
  const [responses, setResponses] = useState(formResponses);

  const handleToggleStatus = (id) => {
    setResponses(
      responses.map((response) =>
        response.id === id ? { ...response, status: response.status === 'New' ? 'Responded' : 'New' } : response
      )
    );
  };

  return (
    <div className="admin-page">
      <main>
        <header>
          <h1>Admin Dashboard</h1>
        </header>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response, index) => (
                <tr key={response.id}>
                  <td>{index + 1}</td>
                  <td>{response.name}</td>
                  <td>{response.email}</td>
                  <td>{response.message}</td>
                  <td>
                    <button
                      className={`status-toggle ${response.status === 'New' ? 'new' : 'responded'}`}
                      onClick={() => handleToggleStatus(response.id)}
                    >
                      {response.status === 'New' ? 'New' : 'Responded'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
