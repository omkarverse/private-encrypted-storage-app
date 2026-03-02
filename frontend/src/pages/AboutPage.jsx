import React from 'react';
import { Users, Info, Code as CodeIcon, Server, Shield, Database } from 'lucide-react';

function AboutPage() {
    return (
        <div className="home-page">
            <h1 className="page-title">About CloudVault</h1>
            <p className="page-subtitle">Built for privacy, designed for simplicity</p>

            <section className="features-section" style={{ marginTop: '2rem' }}>
                <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="hero-icon-wrapper" style={{ marginBottom: '1rem', width: '60px', height: '60px' }}>
                        <Info size={30} />
                    </div>
                    <h2 style={{ marginBottom: '1rem', color: 'var(--bg-dark)' }}>Our Mission</h2>
                    <p style={{ color: 'var(--text-medium)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                        CloudVault was created with a simple philosophy: personal cloud storage should be secure, accessible, and free of unnecessary bloat.
                        By leveraging modern web technologies and secure cloud infrastructure like MongoDB Atlas, we provide a unified space where you can store,
                        manage, and version control your most important files without compromising on privacy.
                    </p>
                </div>
            </section>

            <section className="steps-section" style={{ background: 'var(--surface-alt)', color: 'var(--bg-dark)' }}>
                <h2 className="section-title">The Engineering Behind It</h2>
                <p className="section-subtitle" style={{ color: 'var(--text-medium)' }}>A robust MERN stack architecture</p>

                <div className="features-grid">
                    <div className="feature-card glass-panel" style={{ background: 'var(--bg-light)' }}>
                        <div className="feature-icon"><Server size={28} /></div>
                        <h3>Backend</h3>
                        <p>Powered by Node.js and Express, handling optimized streaming and secure API endpoints.</p>
                    </div>
                    <div className="feature-card glass-panel" style={{ background: 'var(--bg-light)' }}>
                        <div className="feature-icon"><Database size={28} /></div>
                        <h3>Storage Engine</h3>
                        <p>MongoDB Atlas handles both user models and direct binary file storage within secure BSON documents.</p>
                    </div>
                    <div className="feature-card glass-panel" style={{ background: 'var(--bg-light)' }}>
                        <div className="feature-icon"><Shield size={28} /></div>
                        <h3>Authentication</h3>
                        <p>Google OAuth 2.0 via Passport.js ensures industry-standard security without the need for manual passwords.</p>
                    </div>
                </div>
            </section>

            <section className="features-section" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 className="section-title">The Developer</h2>
                <div className="glass-panel" style={{ display: 'inline-block', marginTop: '2rem', padding: '3rem 4rem' }}>
                    <div className="hero-icon-wrapper" style={{ width: '80px', height: '80px', background: 'var(--bg-dark)', color: 'var(--accent)' }}>
                        <CodeIcon size={40} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--bg-dark)' }}>Omkar Gundale</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Full-Stack Software Engineer</p>
                    <p style={{ maxWidth: '400px', margin: '1.5rem auto 0', color: 'var(--text-medium)' }}>
                        Passionate about building intuitive, high-performance web applications that bridge complex backend architecture with beautiful, earthy frontend designs.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default AboutPage;
