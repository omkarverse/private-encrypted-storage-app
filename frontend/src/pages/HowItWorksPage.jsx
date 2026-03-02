import React from 'react';
import { UploadCloud, FolderLock, Share2, History, Check } from 'lucide-react';

function HowItWorksPage() {
    return (
        <div className="home-page">
            <h1 className="page-title">How It Works</h1>
            <p className="page-subtitle">Simple, secure, and built for your workflow</p>

            <div className="features-grid" style={{ marginTop: '3rem' }}>
                <div className="feature-card glass-panel">
                    <div className="feature-icon" style={{ background: 'var(--bg-dark)', color: 'var(--accent)' }}>
                        <FolderLock size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.3rem' }}>1. Secure Authentication</h3>
                    <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
                        We use Google OAuth 2.0. This means you never have to trust us with a password. Simply log in with your existing Google account, and your session is securely encrypted using industry-standard JWTs.
                    </p>
                </div>

                <div className="feature-card glass-panel">
                    <div className="feature-icon" style={{ background: 'var(--bg-dark)', color: 'var(--accent)' }}>
                        <UploadCloud size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.3rem' }}>2. Seamless Uploads</h3>
                    <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
                        Drag and drop your photos, documents, PDFs, or source code (up to 10MB per file). Files are automatically categorized based on their MIME type and stored as raw binaries securely inside our MongoDB Atlas cluster.
                    </p>
                </div>

                <div className="feature-card glass-panel">
                    <div className="feature-icon" style={{ background: 'var(--bg-dark)', color: 'var(--accent)' }}>
                        <History size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.3rem' }}>3. Version Control</h3>
                    <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
                        Did you make a change to a document or update a snippet of code? Just upload the file again. CloudVault automatically detects the update, increments the version number, and securely archives the older version for you to access anytime.
                    </p>
                </div>

                <div className="feature-card glass-panel">
                    <div className="feature-icon" style={{ background: 'var(--bg-dark)', color: 'var(--accent)' }}>
                        <Share2 size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.3rem' }}>4. One-Click Sharing</h3>
                    <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
                        Need to share a file? Click "Share" to generate a unique, cryptographically secure download link. Anyone with the link can download the file immediately—no account required. You can revoke the link at any time with a single click.
                    </p>
                </div>
            </div>

            <section className="steps-section" style={{ marginTop: '5rem', background: 'var(--bg-dark)' }}>
                <h2 className="section-title" style={{ color: 'var(--accent)' }}>Is my data safe?</h2>
                <div style={{ maxWidth: '800px', margin: '2rem auto 0', color: 'var(--surface)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    <p style={{ marginBottom: '1rem' }}>
                        Yes. Security is built into the architecture from day one:
                    </p>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                            <Check size={20} style={{ color: 'var(--accent)' }} />
                            No local passwords stored or required
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                            <Check size={20} style={{ color: 'var(--accent)' }} />
                            HTTPOnly cookies protect against Cross-Site Scripting (XSS)
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                            <Check size={20} style={{ color: 'var(--accent)' }} />
                            MongoDB Atlas provides automated storage encryption at rest
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                            <Check size={20} style={{ color: 'var(--accent)' }} />
                            Secure CORS policies ensure API endpoints are accessible only from the official frontend
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default HowItWorksPage;
