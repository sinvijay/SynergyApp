import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CompressPdf = () => {
  const [file, setFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(60);
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

    // Fake a loading state simulating the PDF compression process
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2500); 
  };

  return (
    <div className="tool-page-container">
      
      <div className="tool-header">
        <h2>Compress PDF</h2>
        <p>Reduce the file size of your PDF documents while maintaining readable quality.</p>
      </div>

      <form onSubmit={handleFakeSubmit}>
        
        {/* File Drop Area */}
        <div className="file-drop-area">
          <input 
            type="file" 
            accept="application/pdf, .pdf" 
            onChange={handleFileChange} 
            required 
          />
          <div className="file-drop-text">Click or drag a PDF here to compress</div>
          <div className="file-drop-subtext">Supports PDF files up to 50MB</div>
        </div>

        {file && (
          <div className="file-info">
            Selected Document: {file.name}
          </div>
        )}

        {/* Settings Panel */}
        <div className="settings-panel">
          <label style={{ fontWeight: '600' }}>Compression Level</label>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>
            Higher compression = smaller file size but slightly lower image quality inside the PDF.
          </p>
          
          <div className="slider-container">
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Less</span>
            <input 
              type="range" 
              min="10" 
              max="90" 
              value={compressionLevel} 
              onChange={(e) => setCompressionLevel(e.target.value)} 
            />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>More</span>
            <span className="slider-value" style={{ marginLeft: '1rem' }}>{compressionLevel}%</span>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || !file} 
          style={{ padding: '1rem', fontSize: '1.1rem', width: '100%' }}
        >
          {loading ? 'Compressing PDF...' : 'Compress PDF Now'}
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
          <h3 style={{ color: '#166534', margin: '0 0 1rem 0' }}>🗜️ PDF Compressed Successfully!</h3>
          <p style={{ color: '#15803d', marginBottom: '1.5rem' }}>
            Your file has been optimized. We saved you roughly {Math.floor(Math.random() * 40 + 30)}% in file size!
          </p>
          <button 
            className="btn btn-primary" 
            onClick={() => alert(`Fake download triggered for: compressed_${file.name}`)}
          >
            Download Compressed PDF
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

export default CompressPdf;