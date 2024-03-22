import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import AdminPage from './components/Admin/AdminPage';
import SuperAdmin from './components/Superadmin/SuperAdmin';
import NotFoundPage from './components/NotFoundPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Content />
              <Footer />
            </>
          } />
          <Route path="/admin" element={
            <>
              <Header />
              <AdminPage />
              <Footer />
            </>
          } />
          <Route path="/superadmin" element={
            <>
              <Header />
              <SuperAdmin />
              <Footer />
            </>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;