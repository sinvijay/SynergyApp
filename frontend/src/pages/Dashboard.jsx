import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Static dummy data for the UI
  const dummyUser = {
    first_name: "Developer",
    email: "dev@synergy.com"
  };

  const tools = [
    { id: 1, name: 'Compress Image', desc: 'Reduce image file size without losing quality.', link: '/tools/compress-image' },
    { id: 2, name: 'Remove Background', desc: 'Automatically remove the background from any image.', link: '/tools/remove-bg' },
    { id: 3, name: 'Merge PDF', desc: 'Combine multiple PDF files into a single document.', link: '/tools/merge-pdf' },
    { id: 4, name: 'Compress PDF', desc: 'Reduce the file size of your PDF documents.', link: '/tools/compress-pdf' },
    { id: 5, name: 'PDF to Word', desc: 'Convert PDF documents into editable Word files.', link: '/tools/pdf-to-word' },
    { id: 6, name: 'Word to PDF', desc: 'Convert Word documents into secure PDF files.', link: '/tools/word-to-pdf' },
    { id: 7, name: 'OCR Extraction', desc: 'Extract readable text from images or scanned documents.', link: '/tools/ocr' },
  ];

  return (
    <div className="dashboard-container">
      
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="user-info">
          <h2>Welcome back, {dummyUser.first_name}!</h2>
          <p>{dummyUser.email}</p>
        </div>
        <div className="header-actions">
          <Link to="/profile" className="btn btn-outline" style={{ marginRight: '10px' }}>Edit Profile</Link>
          <Link to="/login" className="btn btn-primary">Log Out</Link>
        </div>
      </div>

      {/* Tools Grid Section */}
      <h3>Your Utility Services</h3>
      <div className="tools-grid">
        {tools.map((tool) => (
          <Link to={tool.link} key={tool.id} className="tool-card">
            <h3>{tool.name}</h3>
            <p>{tool.desc}</p>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>Open Tool &rarr;</span>
          </Link>
        ))}
      </div>

      {/* Chatbot Section */}
      <div className="chat-section">
        <h3>Need Help? Ask the Assistant</h3>
        <div className="chat-window">
          <div className="chat-msg msg-bot">
            <strong>Bot:</strong> Hi {dummyUser.first_name}! How can I help you use the tools today?
          </div>
          {/* Dummy user message just to show what it looks like */}
          <div className="chat-msg msg-user">
            <strong>You:</strong> How do I merge PDFs?
          </div>
        </div>
        
        <div className="chat-input-area">
          <input type="text" placeholder="Ask how to merge PDFs..." />
          <button className="btn btn-primary">Send</button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;