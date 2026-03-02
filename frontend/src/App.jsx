import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SharedDownloadPage from './pages/SharedDownloadPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import UploadPage from './pages/UploadPage';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="app-wrapper">
                    <Navbar />
                    <div className="app-container">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/how-it-works" element={<HowItWorksPage />} />
                            <Route path="/pricing" element={<PricingPage />} />
                            <Route path="/upload" element={<UploadPage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/shared/:shareToken" element={<SharedDownloadPage />} />
                        </Routes>
                    </div>
                    <footer className="app-footer">
                        <p>Built with ❤️ by <strong>Omkar Gundale</strong> | CloudVault — Secure Zero-Cost Storage</p>
                    </footer>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
