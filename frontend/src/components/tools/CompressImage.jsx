import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

const CompressImage = () => {
    const [file, setFile] = useState(null);
    const [quality, setQuality] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select an image first.');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('quality', quality);

        try {
            // We expect a File/Blob back from Django
            const response = await api.post('/tools/compress-image/', formData, {
                responseType: 'blob', 
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Create a download link for the returned file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `compressed_${file.name}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            
        } catch (err) {
            setError('Failed to compress image. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tool-card">
            <h2>Image Compressor</h2>
            
            {error && <p className="error-msg">{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>Select an Image to compress:</label>
                <input type="file" accept="image/*" onChange={handleFileChange} required />
                
                <label>Compression Quality: {quality}</label>
                <input 
                    type="range" 
                    min="10" max="90" 
                    value={quality} 
                    onChange={(e) => setQuality(e.target.value)} 
                />
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Compressing...' : 'Compress Image'}
                </button>
            </form>

            <Link to="/" className="back-link">Back to Dashboard</Link>
        </div>
    );
};

export default CompressImage;