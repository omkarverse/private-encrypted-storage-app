import React from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PricingPage() {
    const { user, login } = useAuth();

    return (
        <div className="home-page">
            <h1 className="page-title">Pricing</h1>
            <p className="page-subtitle">Premium cloud storage. Absolutely zero cost.</p>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <div className="glass-panel" style={{ maxWidth: '450px', width: '100%', padding: '3rem 2.5rem', border: '2px solid var(--accent)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '1.5rem', right: '-2.5rem', background: 'var(--accent)', color: 'var(--bg-dark)', padding: '0.3rem 3rem', transform: 'rotate(45deg)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '1px' }}>
                        FOREVER FREE
                    </div>

                    <h2 style={{ fontSize: '2.5rem', color: 'var(--bg-dark)', marginBottom: '0.5rem' }}>₹0 / mo</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>The only plan you'll ever need.</p>

                    <div style={{ borderTop: '1px solid var(--glass-border)', margin: '2rem 0' }}></div>

                    <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left', color: 'var(--text-dark)' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', fontSize: '1.05rem' }}>
                            <Check size={22} style={{ color: 'var(--success)' }} /> 512 MB Total Free Storage
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', fontSize: '1.05rem' }}>
                            <Check size={22} style={{ color: 'var(--success)' }} /> Max 10MB per file
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', fontSize: '1.05rem' }}>
                            <Check size={22} style={{ color: 'var(--success)' }} /> Unlimited File Versions
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', fontSize: '1.05rem' }}>
                            <Check size={22} style={{ color: 'var(--success)' }} /> Secure Public Link Sharing
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', fontSize: '1.05rem' }}>
                            <Check size={22} style={{ color: 'var(--success)' }} /> Auto-Categorization (Images, PDFs, etc.)
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', fontSize: '1.05rem', color: 'var(--text-muted)' }}>
                            <X size={22} style={{ color: 'var(--danger)' }} /> No Video Uploads Supported
                        </li>
                    </ul>

                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        {user ? (
                            <Link to="/dashboard" className="btn-primary" style={{ width: '100%' }}>
                                Go to Dashboard
                            </Link>
                        ) : (
                            <button className="btn-primary" onClick={login} style={{ width: '100%' }}>
                                Get Started for Free
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <p style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                * CloudVault operates on the MongoDB Atlas M0 Free Tier. Because files are stored as binary buffers, we enforce a 10MB individual limit and a 512MB total limit to ensure stability for all users.
            </p>
        </div>
    );
}

export default PricingPage;
