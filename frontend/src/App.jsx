import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'; // 1. Make sure this import is here!
import CompressImage from './pages/tools/CompressImage';
import MergePdf from './pages/tools/MergePdf';
import Ocr from './pages/tools/Ocr';
import RemoveBg from './pages/tools/RemoveBg';
import PdfToWord from './pages/tools/PdfToWord';
import CompressPdf from './pages/tools/CompressPdf';
import WordToPdf from './pages/tools/WordToPdf';
import EditProfile from './pages/EditProfile';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* 2. Make sure this Route is here! */}
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/tools/compress-image" element={<CompressImage />} />
        <Route path="/tools/merge-pdf" element={<MergePdf />} />
        <Route path="/tools/Ocr" element={<Ocr />} />
        <Route path="/tools/remove-bg" element={<RemoveBg />} />
        <Route path="/tools/pdf-to-word" element={<PdfToWord />} />
        <Route path="/tools/compress-pdf" element={<CompressPdf />} />
        <Route path="/tools/word-to-pdf" element={<WordToPdf />} />
        <Route path="/profile" element={<EditProfile />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;