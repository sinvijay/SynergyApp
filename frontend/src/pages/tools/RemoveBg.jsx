import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RemoveBg = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setSuccess(false); // Reset success state when a new file is chosen
    }
  };

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setSuccess(false);

    // Fake a loading state simulating the AI background removal
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2500);
  };

  return (
    <div className="tool-page-container">
      
      <div className="tool-header">
        <h2>Remove Background</h2>
        <p>Instantly remove the background from any image using AI.</p>
      </div>

      <form onSubmit={handleFakeSubmit}>
        
        {/* File Drop Area */}
        <div className="file-drop-area">
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/webp" 
            onChange={handleFileChange} 
            required 
          />
          <div className="file-drop-text">Click or drag an image here</div>
          <div className="file-drop-subtext">Supports JPG, PNG, and WEBP</div>
        </div>

        {file && (
          <div className="file-info">
            Selected Image: {file.name}
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || !file} 
          style={{ padding: '1rem', fontSize: '1.1rem', width: '100%' }}
        >
          {loading ? 'Processing Image (AI)...' : 'Remove Background Now'}
        </button>

      </form>

      {/* Simulated Success / Result Area */}
      {success && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '2rem', 
          background: '#f0fdf4', 
          border: '1px solid #bbf7d0', 
          borderRadius: '12px',
          textAlign: 'center' 
        }}>
          <h3 style={{ color: '#166534', margin: '0 0 1rem 0' }}>✨ Background Removed Successfully!</h3>
          <p style={{ color: '#15803d', marginBottom: '1.5rem' }}>
            In the real version, your processed image with a transparent background will appear here, ready to be downloaded.
          </p>
          <button className="btn btn-primary" onClick={() => alert('Fake download triggered!')}>
            Download Image (.png)
          </button>
        </div>
      )}

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/dashboard" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
          &larr; Back to Dashboard
        </Link>
      </div>

    </div>
  );
};

export default RemoveBg;