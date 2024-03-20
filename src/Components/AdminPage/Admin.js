import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Admin.css';

const Admin = () => {
  return (
    <div>
      <Header />
      <main className="admin-content">
        <h2>Welcome to Admin Page</h2>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;