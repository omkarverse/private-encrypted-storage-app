import React from 'react';
import { Link } from 'react-router-dom';
import { CloudUpload, ArrowRight, Shield, Share2, History, Image, FileText, Code, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function HomePage() {
    const { user, login } = useAuth();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-shape"></div>
                <div className="hero-bg-shape-2"></div>
                <div className="hero-icon-wrapper">
                    <CloudUpload />
                </div>
                <h1 className="hero-title">
                    Secure Cloud<br /><span className="hero-title-accent">Storage</span>
                </h1>
                <p className="hero-subtitle">Private • Encrypted • Zero Cost</p>
                <p className="hero-description">
                    Store your <strong>photos, documents, PDFs, and source code</strong> securely in the cloud.
                    Share files with a single link. Track versions. All powered by MongoDB Atlas with
                    end-to-end encryption — at absolutely <strong>no cost</strong>.
                </p>
                <div className="hero-actions">
                    {user ? (
                        <Link to="/dashboard" className="btn-primary hero-btn">
                            <Zap size={20} /> Open Dashboard <ArrowRight size={20} />
                        </Link>
                    ) : (
                        <button className="btn-primary hero-btn" onClick={login}>
                            <Zap size={20} /> Get Started — Login with Google
                        </button>
                    )}
                    <a href="#features" className="btn-outline hero-btn">
                        Learn More
                    </a>
                </div>
            </section>

            {/* Stats */}
            <section className="stats-section">
                <div className="stat-card glass-panel">
                    <span className="stat-number">10MB</span>
                    <span className="stat-label">Max File Size</span>
                </div>
                <div className="stat-card glass-panel">
                    <span className="stat-number">₹0</span>
                    <span className="stat-label">Total Cost</span>
                </div>
                <div className="stat-card glass-panel">
                    <span className="stat-number">∞</span>
                    <span className="stat-label">Versions</span>
                </div>
                <div className="stat-card glass-panel">
                    <span className="stat-number">OAuth</span>
                    <span className="stat-label">Google Login</span>
                </div>
            </section>

            {/* Features */}
            <section className="features-section" id="features">
                <h2 className="section-title">Why CloudVault?</h2>
                <p className="section-subtitle">Everything you need for secure personal file storage</p>
                <div className="features-grid">
                    <div className="feature-card glass-panel">
                        <div className="feature-icon"><Shield size={28} /></div>
                        <h3>Secure by Default</h3>
                        <p>Google OAuth 2.0 authentication ensures only you can access your files. No passwords to remember.</p>
                    </div>
                    <div className="feature-card glass-panel">
                        <div className="feature-icon"><Share2 size={28} /></div>
                        <h3>One-Click Sharing</h3>
                        <p>Generate a shareable download link for any file. Anyone with the link can download — no login needed.</p>
                    </div>
                    <div className="feature-card glass-panel">
                        <div className="feature-icon"><History size={28} /></div>
                        <h3>Version History</h3>
                        <p>Upload new versions of files while keeping the full history. Roll back or compare anytime.</p>
                    </div>
                    <div className="feature-card glass-panel">
                        <div className="feature-icon"><Image size={28} /></div>
                        <h3>Smart Categories</h3>
                        <p>Files are auto-organized into Photos, Documents, PDFs, and Source Code based on type.</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="steps-section">
                <h2 className="section-title">How It Works</h2>
                <p className="section-subtitle">Three simple steps to get started</p>
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>Sign In</h3>
                        <p>Log in securely with your Google account. One click, no forms, no passwords.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>Upload Files</h3>
                        <p>Drag and drop or browse to upload photos, docs, PDFs, or source code (up to 10MB each).</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>Share & Manage</h3>
                        <p>Download your files anytime, share via link, or upload new versions — all from one dashboard.</p>
                    </div>
                </div>
            </section>

            {/* Supported File Types */}
            <section className="features-section">
                <h2 className="section-title">Supported File Types</h2>
                <p className="section-subtitle">Store almost anything — except videos</p>
                <div className="features-grid">
                    <div className="feature-card glass-panel">
                        <div className="feature-icon"><Image size={28} /></div>
                        <h3>Photos</h3>
                        <p>JPG, PNG, GIF, WebP and other image formats</p>
                    </div>
                    <div className="feature-card glass-panel">
                        <div className="feature-icon"><FileText size={28} /></div>
                        <h3>Documents & PDFs</h3>
                        <p>Word docs, text files, PDFs — all your reading material</p>
                    </div>
                    <div className="feature-card glass-panel">
                        <div className="feature-icon"><Code size={28} /></div>
                        <h3>Source Code</h3>
                        <p>JS, Python, HTML, CSS, Java, C++ and 20+ more extensions</p>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="tech-section">
                <h2 className="section-title">Built With</h2>
                <p className="section-subtitle">Modern technologies powering CloudVault</p>
                <div className="tech-grid">
                    <div className="tech-card glass-panel">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="tech-icon-img" />
                        <span className="tech-name">React.js</span>
                        <span className="tech-role">Frontend</span>
                    </div>
                    <div className="tech-card glass-panel">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="tech-icon-img" />
                        <span className="tech-name">Node.js</span>
                        <span className="tech-role">Runtime</span>
                    </div>
                    <div className="tech-card glass-panel">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="tech-icon-img" />
                        <span className="tech-name">Express</span>
                        <span className="tech-role">API</span>
                    </div>
                    <div className="tech-card glass-panel">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="tech-icon-img" />
                        <span className="tech-name">MongoDB</span>
                        <span className="tech-role">Database</span>
                    </div>
                    <div className="tech-card glass-panel">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="tech-icon-img" />
                        <span className="tech-name">OAuth 2.0</span>
                        <span className="tech-role">Auth</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
