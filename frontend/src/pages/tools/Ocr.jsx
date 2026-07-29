import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Ocr = () => {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('eng');
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setExtractedText(''); // Clear old text when a new file is uploaded
    }
  };

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setExtractedText('');

    // Fake loading state for UI testing
    setTimeout(() => {
      setLoading(false);
      // Fake extracted text result
      setExtractedText("This is a simulated OCR extraction result.\n\nIn the real version, your Django backend using Tesseract will process the image and return the actual text found inside the document here.");
    }, 2500);
  };

  return (
    <div className="tool-page-container">
      
      <div className="tool-header">
        <h2>OCR Text Extraction</h2>
        <p>Extract readable and searchable text from images and scanned documents.</p>
      </div>

      <form onSubmit={handleFakeSubmit}>
        
        {/* File Drop Area */}
        <div className="file-drop-area">
          <input 
            type="file" 
            accept="image/*,application/pdf" 
            onChange={handleFileChange} 
            required 
          />
          <div className="file-drop-text">Click or drag a document here</div>
          <div className="file-drop-subtext">Supports JPG, PNG, and PDF</div>
        </div>

        {file && (
          <div className="file-info">
            Selected File: {file.name}
          </div>
        )}

        {/* Settings Panel */}
        <div className="settings-panel">
          <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
            Document Language
          </label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }}
          >
            <option value="eng">English</option>
            <option value="spa">Spanish</option>
            <option value="fra">French</option>
            <option value="deu">German</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || !file} 
          style={{ padding: '1rem', fontSize: '1.1rem', width: '100%' }}
        >
          {loading ? 'Extracting Text...' : 'Extract Text Now'}
        </button>
      </form>

      {/* Results Area (Only shows if there is text) */}
      {extractedText && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>Extracted Text:</h3>
          <textarea 
            readOnly 
            value={extractedText} 
            rows="8"
            style={{ 
              width: '100%', 
              padding: '1rem', 
              borderRadius: '8px', 
              border: '1px solid #cbd5e1',
              backgroundColor: '#f8fafc',
              resize: 'vertical',
              fontFamily: 'monospace',
              fontSize: '0.95rem',
              color: 'var(--text-main)'
            }}
          />
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

export default Ocr;