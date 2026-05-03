// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FileUp, Upload as UploadIcon, X, AlertCircle } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// const ALLOWED_EXTENSIONS = [
//     // Images
//     '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico',
//     // Documents
//     '.doc', '.docx', '.txt', '.rtf', '.odt', '.xls', '.xlsx', '.ppt', '.pptx',
//     // PDFs
//     '.pdf',
//     // Source code
//     '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.h',
//     '.html', '.css', '.json', '.xml', '.yaml', '.yml', '.sh', '.bat',
//     '.rb', '.go', '.rs', '.php', '.sql', '.md', '.swift', '.kt',
// ];

// function UploadPage() {
//     const { user, loading: authLoading } = useAuth();
//     const navigate = useNavigate();

//     const [file, setFile] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState(false);
//     const [dragOver, setDragOver] = useState(false);
//     const fileInputRef = useRef(null);

//     useEffect(() => {
//         if (!authLoading && !user) navigate('/');
//     }, [user, authLoading, navigate]);

//     if (authLoading || !user) return null;

//     const validateFile = (f) => {
//         if (!f) return 'No file selected';
//         if (f.size > 10 * 1024 * 1024) return 'File size exceeds 10MB limit';
//         if (f.type.startsWith('video/')) return 'Video files are not allowed';

//         const ext = '.' + f.name.split('.').pop().toLowerCase();
//         if (!ALLOWED_EXTENSIONS.includes(ext)) {
//             return `File type "${ext}" is not supported`;
//         }

//         return null;
//     };

//     const handleFileSelect = (f) => {
//         setSuccess(false);
//         const err = validateFile(f);
//         if (err) {
//             setError(err);
//             setFile(null);
//             return;
//         }
//         setError('');
//         setFile(f);
//     };

//     const handleDrop = (e) => {
//         e.preventDefault();
//         setDragOver(false);
//         if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//             handleFileSelect(e.dataTransfer.files[0]);
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) return;

//         setUploading(true);
//         setError('');
//         setProgress(0);

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             await axios.post(`${API_BASE}/api/files/upload`, formData, {
//                 withCredentials: true,
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 onUploadProgress: (e) => {
//                     const pct = Math.round((e.loaded * 100) / e.total);
//                     setProgress(pct);
//                 },
//             });
//             setSuccess(true);
//             setFile(null);
//             setTimeout(() => {
//                 navigate('/dashboard');
//             }, 1500);
//         } catch (err) {
//             setError(err.response?.data?.error || 'Upload failed. Ensure backend is running and MongoDB is connected.');
//         } finally {
//             setUploading(false);
//         }
//     };

//     const formatSize = (bytes) => {
//         if (bytes < 1024) return bytes + ' B';
//         if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
//         return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
//     };

//     return (
//         <div className="home-page" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//             <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
//                 <h1 className="page-title">Upload File</h1>
//                 <p className="page-subtitle" style={{ marginBottom: '1rem' }}>Securely stash your file into the CloudVault</p>
//             </div>

//             <div className="glass-panel" style={{ maxWidth: '700px', width: '100%', padding: '3rem' }}>
//                 {error && (
//                     <div className="toast toast-error" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
//                         <AlertCircle size={18} /> <span>{error}</span>
//                     </div>
//                 )}

//                 {success && (
//                     <div className="toast toast-success" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
//                         <UploadIcon size={18} /> <span>File uploaded successfully! Redirecting to dashboard...</span>
//                     </div>
//                 )}

//                 <div
//                     className={`dropzone ${dragOver ? 'drag-over' : ''}`}
//                     style={{ padding: '5rem 2rem', background: dragOver ? 'rgba(174, 183, 132, 0.15)' : 'rgba(174, 183, 132, 0.05)', borderColor: dragOver ? 'var(--accent)' : 'var(--glass-border)' }}
//                     onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
//                     onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
//                     onDrop={handleDrop}
//                     onClick={() => !uploading && fileInputRef.current?.click()}
//                 >
//                     <FileUp size={64} style={{ color: dragOver ? 'var(--accent)' : 'var(--text-muted)', marginBottom: '1.5rem', transition: 'color 0.3s' }} />
//                     <h3 style={{ fontSize: '1.5rem', color: 'var(--bg-dark)', marginBottom: '0.5rem' }}>Drag & drop your file here</h3>
//                     <p style={{ fontSize: '1.1rem' }}>or <span className="browse-text">browse files</span></p>
//                     <p className="file-types" style={{ marginTop: '1rem' }}>Photos • Documents • PDFs • Source Code</p>
//                     <p className="file-types">Max size: 10MB (Videos not supported)</p>

//                     <input
//                         ref={fileInputRef}
//                         type="file"
//                         style={{ display: 'none' }}
//                         onChange={(e) => {
//                             if (e.target.files && e.target.files.length > 0) {
//                                 handleFileSelect(e.target.files[0]);
//                                 e.target.value = null; // reset input
//                             }
//                         }}
//                         accept={ALLOWED_EXTENSIONS.join(',')}
//                     />
//                 </div>

//                 {file && !success && (
//                     <div className="selected-file" style={{ margin: '2rem 0', padding: '1.5rem' }}>
//                         <FileUp size={30} style={{ color: 'var(--accent)', flexShrink: 0 }} />
//                         <div className="selected-file-info">
//                             <div className="selected-file-name" style={{ fontSize: '1.1rem' }}>{file.name}</div>
//                             <div className="selected-file-size" style={{ fontSize: '0.9rem' }}>{formatSize(file.size)}</div>
//                         </div>
//                         <button className="modal-close" onClick={() => setFile(null)} disabled={uploading} style={{ padding: '0.5rem' }}>
//                             <X size={24} />
//                         </button>
//                     </div>
//                 )}

//                 {uploading && (
//                     <div className="upload-progress" style={{ margin: '2rem 0' }}>
//                         <div className="progress-bar-wrapper" style={{ height: '12px' }}>
//                             <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
//                         </div>
//                         <p style={{ textAlign: 'center', marginTop: '0.8rem', fontSize: '1rem', color: 'var(--bg-dark)', fontWeight: 'bold' }}>
//                             Uploading... {progress}%
//                         </p>
//                     </div>
//                 )}

//                 <div style={{ marginTop: '2rem', textAlign: 'center' }}>
//                     <button
//                         className="btn-primary"
//                         onClick={handleUpload}
//                         disabled={!file || uploading || success}
//                         style={{ padding: '1rem 3rem', fontSize: '1.2rem', width: '100%' }}
//                     >
//                         {uploading ? 'Uploading to Vault...' : 'Upload File via Encrypted Tunnel'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UploadPage;
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FileUp, Upload as UploadIcon, X, AlertCircle, ShieldCheck, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ALLOWED_EXTENSIONS = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico',
    '.doc', '.docx', '.txt', '.rtf', '.odt', '.xls', '.xlsx', '.ppt', '.pptx',
    '.pdf',
    '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.h',
    '.html', '.css', '.json', '.xml', '.yaml', '.yml', '.sh', '.bat',
    '.rb', '.go', '.rs', '.php', '.sql', '.md', '.swift', '.kt',
];

function SuccessModal({ fileName, encryptedAs, onClose }) {
    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, backdropFilter: 'blur(8px)',
        }}>
            <div style={{
                background: 'var(--surface)', borderRadius: '1.5rem',
                padding: '2.5rem', maxWidth: '480px', width: '90%',
                boxShadow: '0 0 60px rgba(174,183,132,0.3)',
                border: '1px solid var(--accent)', textAlign: 'center',
                animation: 'fadeIn 0.3s ease',
            }}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'var(--bg-dark)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 0 30px rgba(174,183,132,0.4)',
                }}>
                    <ShieldCheck size={40} style={{ color: 'var(--accent)' }} />
                </div>

                <h2 style={{ color: 'var(--bg-dark)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                    File Stored Safely! 🔐
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    Your file has been encrypted and secured in the vault.
                </p>

                <div style={{
                    background: 'var(--bg-dark)', borderRadius: '1rem',
                    padding: '1.2rem', marginBottom: '1.5rem', textAlign: 'left',
                }}>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                        <Lock size={16} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '2px' }}>Original file</div>
                            <div style={{ color: 'var(--surface)', fontSize: '0.9rem', fontWeight: 600, wordBreak: 'break-all' }}>{fileName}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                        <ShieldCheck size={16} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '2px' }}>Encryption</div>
                            <div style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 700 }}>AES-256-CBC ✓</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                        <Lock size={16} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '2px' }}>Stored in vault as</div>
                            <div style={{ color: '#aaa', fontSize: '0.8rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>{encryptedAs || 'encrypted-vault/*.enc'}</div>
                        </div>
                    </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    The encrypted file is unreadable by anyone — including developers. Only you can decrypt and download it through CloudVault.
                </p>

                <button
                    className="btn-primary"
                    onClick={onClose}
                    style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
                >
                    Go to My Files →
                </button>
            </div>
        </div>
    );
}

function UploadPage() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [successData, setSuccessData] = useState(null); // holds { fileName, encryptedAs }
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!authLoading && !user) navigate('/');
    }, [user, authLoading, navigate]);

    if (authLoading || !user) return null;

    const validateFile = (f) => {
        if (!f) return 'No file selected';
        if (f.size > 10 * 1024 * 1024) return 'File size exceeds 10MB limit';
        if (f.type.startsWith('video/')) return 'Video files are not allowed';
        const ext = '.' + f.name.split('.').pop().toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) return `File type "${ext}" is not supported`;
        return null;
    };

    const handleFileSelect = (f) => {
        setSuccessData(null);
        const err = validateFile(f);
        if (err) { setError(err); setFile(null); return; }
        setError('');
        setFile(f);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setError('');
        setProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const { data } = await axios.post(`${API_BASE}/api/files/upload`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (e) => {
                    const pct = Math.round((e.loaded * 100) / e.total);
                    setProgress(pct);
                },
            });

            // Show success popup
            setSuccessData({
                fileName: file.name,
                encryptedAs: data.encryptedAs,
            });
            setFile(null);
        } catch (err) {
            setError(err.response?.data?.error || 'Upload failed. Make sure backend is running.');
        } finally {
            setUploading(false);
        }
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    return (
        <div className="home-page" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Success Popup Modal */}
            {successData && (
                <SuccessModal
                    fileName={successData.fileName}
                    encryptedAs={successData.encryptedAs}
                    onClose={() => navigate('/dashboard')}
                />
            )}

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 className="page-title">Upload File</h1>
                <p className="page-subtitle">Files are encrypted with AES-256-CBC before being stored</p>
            </div>

            <div className="glass-panel" style={{ maxWidth: '700px', width: '100%', padding: '3rem' }}>
                {error && (
                    <div className="toast toast-error" style={{ marginBottom: '1.5rem', justifyContent: 'center' }}>
                        <AlertCircle size={18} /> <span>{error}</span>
                    </div>
                )}

                <div
                    className={`dropzone ${dragOver ? 'drag-over' : ''}`}
                    style={{
                        padding: '5rem 2rem',
                        background: dragOver ? 'rgba(174, 183, 132, 0.15)' : 'rgba(174, 183, 132, 0.05)',
                        borderColor: dragOver ? 'var(--accent)' : 'var(--glass-border)',
                        cursor: 'pointer',
                    }}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
                    onDrop={handleDrop}
                    onClick={() => !uploading && fileInputRef.current?.click()}
                >
                    <FileUp size={64} style={{ color: dragOver ? 'var(--accent)' : 'var(--text-muted)', marginBottom: '1.5rem', transition: 'color 0.3s' }} />
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--bg-dark)', marginBottom: '0.5rem' }}>Drag & drop your file here</h3>
                    <p style={{ fontSize: '1.1rem' }}>or <span className="browse-text">browse files</span></p>
                    <p className="file-types" style={{ marginTop: '1rem' }}>Photos • Documents • PDFs • Source Code</p>
                    <p className="file-types">Max size: 10MB (Videos not supported)</p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                handleFileSelect(e.target.files[0]);
                                e.target.value = null;
                            }
                        }}
                        accept={ALLOWED_EXTENSIONS.join(',')}
                    />
                </div>

                {file && (
                    <div className="selected-file" style={{ margin: '2rem 0', padding: '1.5rem' }}>
                        <FileUp size={30} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                        <div className="selected-file-info">
                            <div className="selected-file-name" style={{ fontSize: '1.1rem' }}>{file.name}</div>
                            <div className="selected-file-size" style={{ fontSize: '0.9rem' }}>{formatSize(file.size)}</div>
                        </div>
                        <button className="modal-close" onClick={() => setFile(null)} disabled={uploading} style={{ padding: '0.5rem' }}>
                            <X size={24} />
                        </button>
                    </div>
                )}

                {uploading && (
                    <div className="upload-progress" style={{ margin: '2rem 0' }}>
                        <div className="progress-bar-wrapper" style={{ height: '12px' }}>
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p style={{ textAlign: 'center', marginTop: '0.8rem', fontSize: '1rem', color: 'var(--bg-dark)', fontWeight: 'bold' }}>
                            🔐 Encrypting & Uploading... {progress}%
                        </p>
                    </div>
                )}

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button
                        className="btn-primary"
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        style={{ padding: '1rem 3rem', fontSize: '1.2rem', width: '100%' }}
                    >
                        {uploading ? '🔐 Encrypting & Storing...' : '🔒 Upload & Encrypt File'}
                    </button>
                </div>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    🛡️ Protected by AES-256-CBC · Files stored as unreadable .enc binaries
                </div>
            </div>
        </div>
    );
}

export default UploadPage;
