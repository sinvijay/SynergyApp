import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CompressImage = () => {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(60);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    // Fake a 2-second loading state for UI testing
    setTimeout(() => {
      setLoading(false);
      alert(`Success! UI Simulation complete. \nFile: ${file.name} \nQuality: ${quality}%`);
    }, 2000);
  };

  return (
    <div className="tool-page-container">
      
      <div className="tool-header">
        <h2>Image Compressor</h2>
        <p>Reduce image file size significantly without losing visible quality.</p>
      </div>

      <form onSubmit={handleFakeSubmit}>
        
        {/* Modern Drag & Drop Area */}
        <div className="file-drop-area">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            required 
          />
          <div className="file-drop-text">Click or drag an image here to upload</div>
          <div className="file-drop-subtext">Supports JPG, PNG, WEBP (Max 10MB)</div>
        </div>

        {/* Show selected file name if one is chosen */}
        {file && (
          <div className="file-info">
            Selected File: {file.name}
          </div>
        )}

        {/* Settings Panel */}
        <div className="settings-panel">
          <label style={{ fontWeight: '600' }}>Compression Quality</label>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>
            Lower value = smaller file size. Higher value = better visual quality.
          </p>
          
          <div className="slider-container">
            <input 
              type="range" 
              min="10" 
              max="90" 
              value={quality} 
              onChange={(e) => setQuality(e.target.value)} 
            />
            <span className="slider-value">{quality}%</span>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading || !file} style={{ padding: '1rem', fontSize: '1.1rem' }}>
          {loading ? 'Compressing Image...' : 'Compress Image Now'}
        </button>

      </form>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/dashboard" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
          &larr; Back to Dashboard
        </Link>
      </div>

    </div>
  );
};

export default CompressImage;