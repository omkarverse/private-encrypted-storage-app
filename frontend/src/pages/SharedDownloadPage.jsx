import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Download, FileDown, AlertCircle, Home } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function SharedDownloadPage() {
    const { shareToken } = useParams();
    const [fileInfo, setFileInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        fetchFileInfo();
    }, [shareToken]);

    const fetchFileInfo = async () => {
        try {
            const { data } = await axios.get(`${API_BASE}/api/files/shared/${shareToken}`);
            setFileInfo(data);
        } catch (err) {
            setError(err.response?.data?.error || 'This shared link is invalid or has been disabled.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        setDownloading(true);
        try {
            const response = await axios.get(`${API_BASE}/api/files/shared/${shareToken}?download=true`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileInfo.originalName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch {
            setError('Download failed.');
        } finally {
            setDownloading(false);
        }
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="shared-page">
                <div className="loading"><div className="loading-spinner"></div><br />Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="shared-page">
                <div className="shared-card glass-panel">
                    <div className="shared-icon-wrapper" style={{ background: 'rgba(192,57,43,0.12)', color: 'var(--danger)' }}>
                        <AlertCircle size={36} />
                    </div>
                    <h2>File Not Available</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error}</p>
                    <Link to="/" className="btn-primary">
                        <Home size={18} /> Go Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="shared-page">
            <div className="shared-card glass-panel">
                <div className="shared-icon-wrapper">
                    <FileDown size={36} />
                </div>
                <h2>{fileInfo.originalName}</h2>
                <div className="shared-meta">
                    <span className="shared-meta-item">{fileInfo.category}</span>
                    <span className="shared-meta-item">{formatSize(fileInfo.size)}</span>
                    <span className="shared-meta-item">{formatDate(fileInfo.createdAt)}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                    Someone shared this file with you via CloudVault.
                </p>
                <button className="btn-primary download-btn" onClick={handleDownload} disabled={downloading}>
                    <Download size={22} /> {downloading ? 'Downloading...' : 'Download File'}
                </button>
                <div style={{ marginTop: '2rem' }}>
                    <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Want your own CloudVault? Get started for free →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SharedDownloadPage;
