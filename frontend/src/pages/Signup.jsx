import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);

    try {
      const response = await api.post('/accounts/api/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      console.log('Registration successful:', response.data);
      navigate('/login'); // Redirect to login after successful signup
      
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2>Create an Account</h2>
        <p className="subtitle">Join Synergy Tools today</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" name="username" required placeholder="Choose a username"
              value={formData.username} onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" name="email" required placeholder="you@example.com"
              value={formData.email} onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" name="password" required placeholder="••••••••"
              value={formData.password} onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              type="password" name="confirmPassword" required placeholder="••••••••"
              value={formData.confirmPassword} onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4" style={{ fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;