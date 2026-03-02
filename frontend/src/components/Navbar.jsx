import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloudUpload, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, login, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/" className="brand-link">
                    <CloudUpload className="brand-icon" />
                    <span className="brand-text">Cloud<span>Vault</span></span>
                </Link>
            </div>

            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/how-it-works" className={isActive('/how-it-works')} onClick={() => setMenuOpen(false)}>How it Works</Link>
                <Link to="/pricing" className={isActive('/pricing')} onClick={() => setMenuOpen(false)}>Pricing</Link>
                <Link to="/about" className={isActive('/about')} onClick={() => setMenuOpen(false)}>About Us</Link>

                {user && (
                    <>
                        <Link to="/dashboard" className={isActive('/dashboard')} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                        <Link to="/upload" className={isActive('/upload')} onClick={() => setMenuOpen(false)}>Upload</Link>
                        <Link to="/profile" className={isActive('/profile')} onClick={() => setMenuOpen(false)}>
                            {user.avatar ? (
                                <img src={user.avatar} alt="Profile" className="nav-avatar" referrerPolicy="no-referrer" />
                            ) : (
                                <User size={18} />
                            )}
                            Profile
                        </Link>
                    </>
                )}

                {user ? (
                    <button className="nav-auth-btn" onClick={logout}>
                        <LogOut size={16} /> Logout
                    </button>
                ) : (
                    <button className="nav-auth-btn" onClick={login}>
                        <LogIn size={16} /> Login with Google
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
