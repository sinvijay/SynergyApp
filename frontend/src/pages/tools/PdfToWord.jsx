import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PdfToWord = () => {
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

    // Fake a loading state simulating the document conversion
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 3000); // 3 seconds to feel like a real conversion
  };

  return (
    <div className="tool-page-container">
      
      <div className="tool-header">
        <h2>PDF to Word Converter</h2>
        <p>Turn your PDF documents into editable Microsoft Word (.docx) files.</p>
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
          <div className="file-drop-text">Click or drag a PDF here</div>
          <div className="file-drop-subtext">Supports PDF files up to 15MB</div>
        </div>

        {file && (
          <div className="file-info">
            Selected Document: {file.name}
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || !file} 
          style={{ padding: '1rem', fontSize: '1.1rem', width: '100%' }}
        >
          {loading ? 'Converting to Word...' : 'Convert to Word Now'}
        </button>

      </form>

      {/* Simulated Success / Result Area */}
      {success && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '2rem', 
          background: '#eff6ff', 
          border: '1px solid #bfdbfe', 
          borderRadius: '12px',
          textAlign: 'center' 
        }}>
          <h3 style={{ color: '#1e40af', margin: '0 0 1rem 0' }}>📄 Conversion Successful!</h3>
          <p style={{ color: '#1d4ed8', marginBottom: '1.5rem' }}>
            Your PDF has been successfully converted. The text and formatting have been preserved in your new Word document.
          </p>
          <button 
            className="btn btn-primary" 
            onClick={() => alert(`Fake download triggered for: ${file.name.replace('.pdf', '.docx')}`)}
          >
            Download Word Document (.docx)
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

export default PdfToWord;