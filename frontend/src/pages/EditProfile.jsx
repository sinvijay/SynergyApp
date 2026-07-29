import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: 'Developer',
    email: 'dev@synergy.com',
    firstName: 'John',
    lastName: 'Doe'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile update simulated! In the real app, this will send data to your Django backend.');
  };

  return (
    <div className="page-container">
      <div className="auth-card" style={{ maxWidth: '500px' }}>
        <h2>Edit Profile</h2>
        <p className="subtitle">Update your personal information</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Save Changes
          </button>
        </form>

        <hr style={{ margin: '2rem 0', border: '0', borderTop: '1px solid #e5e7eb' }} />

        <h3>Change Password</h3>
        <form className="auth-form">
          <div className="input-group">
            <label>Current Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="input-group">
            <label>New Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="button" className="btn btn-outline" style={{ width: '100%' }}>
            Update Password
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/dashboard" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;