import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload, Search, AlertCircle, FolderOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FileCard from '../components/FileCard';
import FilePreview from '../components/FilePreview';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CATEGORIES = ['All', 'Photo', 'Document', 'PDF', 'SourceCode'];

function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [previewFile, setPreviewFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (user) fetchFiles();
    }, [user, category, searchQuery]);

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => { setSuccess(''); setError(''); }, 3500);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    const fetchFiles = async () => {
        try {
            const params = {};
            if (category !== 'All') params.category = category;
            if (searchQuery.trim()) params.search = searchQuery.trim();

            const { data } = await axios.get(`${API_BASE}/api/files`, {
                withCredentials: true,
                params,
            });
            setFiles(data);
        } catch (err) {
            console.error('Error fetching files:', err);
            setError('Could not fetch files. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };



    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE}/api/files/${id}`, { withCredentials: true });
            setFiles(files.filter(f => f._id !== id));
            setSuccess('File deleted.');
        } catch (err) {
            setError('Failed to delete file.');
        }
    };

    const handleShare = async (id) => {
        try {
            const { data } = await axios.post(`${API_BASE}/api/files/${id}/share`, {}, { withCredentials: true });
            setFiles(files.map(f => f._id === id ? data : f));
            if (data.isShared) {
                setSuccess('Share link generated! Click "Copy Link" on the file card.');
            } else {
                setSuccess('Sharing disabled.');
            }
        } catch (err) {
            setError('Failed to update sharing.');
        }
    };

    const handlePreview = async (file) => {
        try {
            const { data } = await axios.get(`${API_BASE}/api/files/${file._id}`, { withCredentials: true });
            setPreviewFile(data);
        } catch {
            setPreviewFile(file);
        }
    };

    const formatBytes = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const storageUsed = user?.storageUsed || 0;
    const storageMax = 512 * 1024 * 1024; // 512 MB Atlas free tier
    const storagePct = Math.min((storageUsed / storageMax) * 100, 100);

    if (authLoading) {
        return <div className="loading"><div className="loading-spinner"></div><br />Loading...</div>;
    }

    if (!user) return null;

    return (
        <div className="dashboard-page">
            <h1 className="page-title">My Files</h1>
            <p className="page-subtitle">Upload, manage, and share your files</p>

            {/* Toasts */}
            {success && <div className="toast toast-success">{success}</div>}
            {error && <div className="toast toast-error"><AlertCircle size={16} /> {error}</div>}

            {/* Storage Bar */}
            <section className="storage-section glass-panel" style={{ padding: '1.2rem 1.5rem' }}>
                <div className="storage-info">
                    <span className="storage-text">
                        <strong>{formatBytes(storageUsed)}</strong> of {formatBytes(storageMax)} used
                    </span>
                    <span className="storage-text">{storagePct.toFixed(1)}%</span>
                </div>
                <div className="storage-bar-wrapper">
                    <div className="storage-bar-fill" style={{ width: `${storagePct}%` }}></div>
                </div>
            </section>

            {/* Controls */}
            <div className="dashboard-controls">
                <div className="category-tabs">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            className={`category-tab ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat === 'SourceCode' ? 'Source Code' : cat}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div className="search-bar">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search files..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary" onClick={() => navigate('/upload')}>
                        <Upload size={18} /> Upload
                    </button>
                </div>
            </div>

            {/* File Grid */}
            {loading ? (
                <div className="loading">
                    <div className="loading-spinner"></div><br />Loading files...
                </div>
            ) : files.length === 0 ? (
                <div className="empty-state glass-panel">
                    <FolderOpen size={56} className="empty-icon" />
                    <h3>{searchQuery || category !== 'All' ? 'No Files Found' : 'No Files Yet'}</h3>
                    <p>{searchQuery || category !== 'All'
                        ? 'Try a different search or category.'
                        : 'Upload your first file to get started!'
                    }</p>
                    {!searchQuery && category === 'All' && (
                        <button className="btn-primary" onClick={() => navigate('/upload')} style={{ marginTop: '1rem' }}>
                            <Upload size={18} /> Upload Your First File
                        </button>
                    )}
                </div>
            ) : (
                <div className="file-grid">
                    {files.map(file => (
                        <FileCard
                            key={file._id}
                            file={file}
                            onDelete={handleDelete}
                            onShare={handleShare}
                            onPreview={handlePreview}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            {previewFile && (
                <FilePreview
                    file={previewFile}
                    onClose={() => setPreviewFile(null)}
                />
            )}
        </div>
    );
}

export default DashboardPage;
