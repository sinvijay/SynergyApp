import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MergePdf = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      // Convert the FileList object to an array and add to existing files
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    if (files.length < 2) {
      alert("Please upload at least 2 PDFs to merge.");
      return;
    }

    setLoading(true);
    // Fake loading state for UI testing
    setTimeout(() => {
      setLoading(false);
      alert(`Success! UI Simulation complete. \nMerged ${files.length} PDFs.`);
    }, 2000);
  };

  return (
    <div className="tool-page-container">
      
      <div className="tool-header">
        <h2>Merge PDF Files</h2>
        <p>Combine multiple PDF documents into a single file in the exact order you want.</p>
      </div>

      <form onSubmit={handleFakeSubmit}>
        
        {/* Multiple File Drop Area */}
        <div className="file-drop-area">
          <input 
            type="file" 
            accept="application/pdf" 
            multiple 
            onChange={handleFileChange} 
          />
          <div className="file-drop-text">Click or drag PDFs here to upload</div>
          <div className="file-drop-subtext">You can select multiple files at once</div>
        </div>

        {/* List of Selected Files */}
        {files.length > 0 && (
          <ul className="file-list">
            {files.map((file, index) => (
              <li key={index} className="file-list-item">
                <span>📄 {file.name}</span>
                <button 
                  type="button" 
                  className="remove-btn" 
                  onClick={() => removeFile(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || files.length < 2} 
          style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem', width: '100%' }}
        >
          {loading ? 'Merging PDFs...' : 'Merge PDFs Now'}
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

export default MergePdf;