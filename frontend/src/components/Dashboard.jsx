import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="dashboard-card">
            <h2>Welcome to Your Dashboard!</h2>
            <hr />
            <h3>Your Utility Services</h3>
            <ul className="tool-list">
                <li><Link to="/tools/compress-image">Image Tools (Compress Image)</Link></li>
                {/* Add placeholders for the others */}
                <li><span>PDF Tools (Merge PDF) - Coming Soon</span></li>
                <li><span>OCR Extraction - Coming Soon</span></li>
            </ul>
        </div>
    );
};

export default Dashboard;