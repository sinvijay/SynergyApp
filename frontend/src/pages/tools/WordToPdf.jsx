import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WordToPdf = () => {
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
    }, 3000); 
  };

  return (
    <div className="tool-page-container">
      
      <div className="tool-header">
        <h2>Word to PDF Converter</h2>
        <p>Convert your Microsoft Word documents into secure, universally readable PDF files.</p>
      </div>

      <form onSubmit={handleFakeSubmit}>
        
        {/* File Drop Area */}
        <div className="file-drop-area">
          <input 
            type="file" 
            accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
            onChange={handleFileChange} 
            required 
          />
          <div className="file-drop-text">Click or drag a Word document here</div>
          <div className="file-drop-subtext">Supports .doc and .docx files up to 15MB</div>
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
          {loading ? 'Converting to PDF...' : 'Convert to PDF Now'}
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
            Your Word document has been successfully converted to a secure PDF format.
          </p>
          <button 
            className="btn btn-primary" 
            onClick={() => alert(`Fake download triggered for: ${file.name.replace(/\.docx?$/, '.pdf')}`)}
          >
            Download PDF Document
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

export default WordToPdf;