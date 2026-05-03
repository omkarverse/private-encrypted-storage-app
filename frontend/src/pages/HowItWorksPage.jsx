// import React from 'react';
// import { UploadCloud, FolderLock, Share2, History, Check } from 'lucide-react';

// function HowItWorksPage() {
//     return (
//         <div className="home-page">
//             <h1 className="page-title">How It Works</h1>
//             <p className="page-subtitle">Simple, secure, and built for your workflow</p>

//             <div className="features-grid" style={{ marginTop: '3rem' }}>
//                 <div className="feature-card glass-panel">
//                     <div className="feature-icon" style={{ background: 'var(--bg-dark)', color: 'var(--accent)' }}>
//                         <FolderLock size={32} />
//                     </div>
//                     <h3 style={{ fontSize: '1.3rem' }}>1. Secure Authentication</h3>
//                     <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
//                         We use Google OAuth 2.0. This means you never have to trust us with a password. Simply log in with your existing Google account, and your session is securely encrypted using industry-standard JWTs.
//                     </p>
//                 </div>

//                 <div className="feature-card glass-panel">
//                     <div className="feature-icon" style={{ background: 'var(--bg-dark)', color: 'var(--accent)' }}>
//                         <UploadCloud size={32} />
//                     </div>
//                     <h3 style={{ fontSize: '1.3rem' }}>2. Seamless Uploads</h3>
//                     <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
//                         Drag and drop your photos, documents, PDFs, or source code (up to 10MB per file). Files are automatically categorized based on their MIME type and stored as raw binaries securely inside our MongoDB Atlas cluster.
//                     </p>
//                 </div>

//                 <div className="feature-card glass-panel">
//                     <div className="feature-icon" style={{ background: 'var(--bg-dark)', color: 'var(--accent)' }}>
//                         <History size={32} />
//                     </div>
//                     <h3 style={{ fontSize: '1.3rem' }}>3. Version Control</h3>
//                     <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
//                         Did you make a change to a document or update a snippet of code? Just upload the file again. CloudVault automatically detects the update, increments the version number, and securely archives the older version for you to access anytime.
//                     </p>
//                 </div>

//                 <div className="feature-card glass-panel">
//                     <div className="feature-icon" style={{ background: 'var(--bg-dark)', color: 'var(--accent)' }}>
//                         <Share2 size={32} />
//                     </div>
//                     <h3 style={{ fontSize: '1.3rem' }}>4. One-Click Sharing</h3>
//                     <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
//                         Need to share a file? Click "Share" to generate a unique, cryptographically secure download link. Anyone with the link can download the file immediately—no account required. You can revoke the link at any time with a single click.
//                     </p>
//                 </div>
//             </div>

//             <section className="steps-section" style={{ marginTop: '5rem', background: 'var(--bg-dark)' }}>
//                 <h2 className="section-title" style={{ color: 'var(--accent)' }}>Is my data safe?</h2>
//                 <div style={{ maxWidth: '800px', margin: '2rem auto 0', color: 'var(--surface)', fontSize: '1.1rem', lineHeight: 1.8 }}>
//                     <p style={{ marginBottom: '1rem' }}>
//                         Yes. Security is built into the architecture from day one:
//                     </p>
//                     <ul style={{ listStyleType: 'none', padding: 0 }}>
//                         <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
//                             <Check size={20} style={{ color: 'var(--accent)' }} />
//                             No local passwords stored or required
//                         </li>
//                         <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
//                             <Check size={20} style={{ color: 'var(--accent)' }} />
//                             HTTPOnly cookies protect against Cross-Site Scripting (XSS)
//                         </li>
//                         <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
//                             <Check size={20} style={{ color: 'var(--accent)' }} />
//                             MongoDB Atlas provides automated storage encryption at rest
//                         </li>
//                         <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
//                             <Check size={20} style={{ color: 'var(--accent)' }} />
//                             Secure CORS policies ensure API endpoints are accessible only from the official frontend
//                         </li>
//                     </ul>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default HowItWorksPage;


import React, { useState } from 'react';
import { UploadCloud, FolderLock, Share2, History, Check, Lock, Eye, EyeOff, Key } from 'lucide-react';

function HowItWorksPage() {
    const [showRaw, setShowRaw] = useState(false);

    const demoOriginal = 'Hello, this is my secret document content.';
    const demoEncrypted = '3a9f2c1b8e4d7f0a6b5c2d9e1f4a7b3c8d5e2f1a4b7c0d3e6f9a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7e0f3a6b9c2d5e8f1';

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
                        You log in as a Guest User (offline mode) or via Google OAuth 2.0. No passwords are stored. Your session is managed using a mock auth layer — perfect for demos and internship projects.
                    </p>
                </div>

                <div className="feature-card glass-panel">
                    <div className="feature-icon" style={{ background: 'var(--bg-dark)', color: 'var(--accent)' }}>
                        <UploadCloud size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.3rem' }}>2. Encrypted Uploads</h3>
                    <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
                        Every file you upload is immediately encrypted using AES-256-CBC before being saved to disk. The original file content is never stored anywhere — only the encrypted binary version.
                    </p>
                </div>

                <div className="feature-card glass-panel">
                    <div className="feature-icon" style={{ background: 'var(--bg-dark)', color: 'var(--accent)' }}>
                        <History size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.3rem' }}>3. Vault Storage</h3>
                    <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
                        Encrypted files are stored in a secure <code style={{ color: 'var(--accent)', background: 'rgba(0,0,0,0.2)', padding: '0 4px', borderRadius: '4px' }}>encrypted-vault/</code> folder as <code style={{ color: 'var(--accent)', background: 'rgba(0,0,0,0.2)', padding: '0 4px', borderRadius: '4px' }}>.enc</code> binary files. Even opening these files in VS Code shows only garbage — they are completely unreadable.
                    </p>
                </div>

                <div className="feature-card glass-panel">
                    <div className="feature-icon" style={{ background: 'var(--bg-dark)', color: 'var(--accent)' }}>
                        <Share2 size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.3rem' }}>4. On-the-Fly Decryption</h3>
                    <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
                        When you download a file, the server decrypts it in memory using the secret key and streams the original file back to you — the decrypted content is never saved to disk. Sharing works the same way.
                    </p>
                </div>
            </div>

            {/* ── Encryption Deep Dive ── */}
            <section style={{
                marginTop: '5rem',
                background: 'var(--bg-dark)',
                borderRadius: '1.5rem',
                padding: '3rem 2rem',
            }}>
                <h2 className="section-title" style={{ color: 'var(--accent)' }}>🔐 The Encryption Explained</h2>
                <p style={{ color: 'var(--surface)', maxWidth: '700px', margin: '1rem auto', textAlign: 'center', fontSize: '1rem', lineHeight: 1.7 }}>
                    CloudVault uses <strong style={{ color: 'var(--accent)' }}>AES-256-CBC</strong> — the same encryption standard used by banks, governments, and the military.
                </p>

                {/* Visual Demo */}
                <div style={{ maxWidth: '700px', margin: '2.5rem auto 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                        {/* Step 1: Original file */}
                        <div style={{ background: 'rgba(174,183,132,0.08)', borderRadius: '1rem', padding: '1.2rem 1.5rem', border: '1px solid rgba(174,183,132,0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                                <Eye size={16} style={{ color: 'var(--accent)' }} />
                                <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Original File</span>
                            </div>
                            <div style={{ fontFamily: 'monospace', color: 'var(--surface)', fontSize: '0.95rem', background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '0.5rem' }}>
                                {demoOriginal}
                            </div>
                        </div>

                        {/* Arrow */}
                        <div style={{ textAlign: 'center', color: 'var(--accent)', fontSize: '1.5rem' }}>
                            ↓ <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', verticalAlign: 'middle' }}>AES-256-CBC encryption with random IV + secret key</span>
                        </div>

                        {/* Step 2: Encrypted */}
                        <div style={{ background: 'rgba(255,0,0,0.05)', borderRadius: '1rem', padding: '1.2rem 1.5rem', border: '1px solid rgba(255,80,80,0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                                <EyeOff size={16} style={{ color: '#ff6b6b' }} />
                                <span style={{ color: '#ff6b6b', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stored in encrypted-vault/ (unreadable)</span>
                            </div>
                            <div style={{ fontFamily: 'monospace', color: '#888', fontSize: '0.85rem', background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '0.5rem', wordBreak: 'break-all', lineHeight: 1.6 }}>
                                {demoEncrypted}...
                            </div>
                            <div style={{ color: '#555', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                                📁 Saved as: <code style={{ color: '#666' }}>a1b2c3d4-uuid.enc</code> — cannot be opened by anyone
                            </div>
                        </div>

                        {/* Arrow */}
                        <div style={{ textAlign: 'center', color: 'var(--accent)', fontSize: '1.5rem' }}>
                            ↓ <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', verticalAlign: 'middle' }}>When you download — decrypted in memory only</span>
                        </div>

                        {/* Step 3: Back to original */}
                        <div style={{ background: 'rgba(174,183,132,0.08)', borderRadius: '1rem', padding: '1.2rem 1.5rem', border: '1px solid rgba(174,183,132,0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                                <Key size={16} style={{ color: 'var(--accent)' }} />
                                <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>You receive your original file</span>
                            </div>
                            <div style={{ fontFamily: 'monospace', color: 'var(--surface)', fontSize: '0.95rem', background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '0.5rem' }}>
                                {demoOriginal}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key facts */}
                <div style={{ maxWidth: '700px', margin: '2.5rem auto 0' }}>
                    <h3 style={{ color: 'var(--accent)', marginBottom: '1.2rem', textAlign: 'center' }}>Why AES-256-CBC?</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {[
                            ['256-bit key', 'There are 2²⁵⁶ possible keys — more than atoms in the universe. Brute force is impossible.'],
                            ['CBC Mode', 'Cipher Block Chaining — each block of data is XORed with the previous block before encryption, making patterns undetectable.'],
                            ['Random IV', 'Each file gets a unique random Initialization Vector — so even two identical files produce completely different encrypted output.'],
                            ['Zero plaintext storage', 'The original file is never saved to disk. Only the encrypted .enc binary exists in the vault.'],
                            ['On-the-fly decryption', 'Files are decrypted in server memory only when you request a download — the decrypted bytes are never written anywhere.'],
                        ].map(([title, desc]) => (
                            <li key={title} style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                                <Check size={18} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                                <div>
                                    <strong style={{ color: 'var(--accent)' }}>{title}:</strong>{' '}
                                    <span style={{ color: 'var(--surface)', lineHeight: 1.6 }}>{desc}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Security checklist */}
            <section className="steps-section" style={{ marginTop: '3rem', background: 'var(--bg-dark)' }}>
                <h2 className="section-title" style={{ color: 'var(--accent)' }}>Is my data safe?</h2>
                <div style={{ maxWidth: '700px', margin: '2rem auto 0', color: 'var(--surface)', fontSize: '1rem', lineHeight: 1.8 }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {[
                            'AES-256-CBC encryption on every file before storage',
                            'Files stored as unreadable .enc binaries — even developers cannot open them',
                            'Unique random IV per file — no two encrypted files look the same',
                            'No passwords stored or required',
                            'HTTPOnly cookies protect against Cross-Site Scripting (XSS)',
                            'Secure CORS policies ensure API is only accessible from the official frontend',
                        ].map(point => (
                            <li key={point} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                <Check size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default HowItWorksPage;
