import React from 'react';
import { X, Download, History } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function FilePreview({ file, onClose }) {
    if (!file) return null;

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
        });
    };

    const isImage = file.category === 'Photo';

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content" style={{ maxWidth: '600px' }}>
                <div className="modal-header">
                    <h2>{file.originalName}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {isImage && (
                    <img
                        src={`${API_BASE}/api/files/${file._id}/preview`}
                        alt={file.originalName}
                        className="preview-image"
                        crossOrigin="use-credentials"
                    />
                )}

                <div style={{ marginBottom: '1rem' }}>
                    <div className="file-meta" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span className="file-meta-tag">{file.category}</span>
                        <span className="file-meta-tag">{formatSize(file.size)}</span>
                        <span className="file-meta-tag">v{file.version}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Uploaded: {formatDate(file.createdAt)}
                    </p>
                    {file.updatedAt !== file.createdAt && (
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            Last updated: {formatDate(file.updatedAt)}
                        </p>
                    )}
                </div>

                {file.versions && file.versions.length > 0 && (
                    <div className="version-list">
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <History size={18} /> Version History
                        </h3>
                        <div className="version-item" style={{ background: 'rgba(174,183,132,0.2)', fontWeight: 600 }}>
                            <span><span className="version-badge">v{file.version}</span> Current</span>
                            <span>{formatSize(file.size)}</span>
                        </div>
                        {file.versions.slice().reverse().map((v, i) => (
                            <div key={i} className="version-item">
                                <span>
                                    <span className="version-badge" style={{ background: 'var(--surface)', color: 'var(--text-dark)' }}>v{v.version}</span>{' '}
                                    {formatDate(v.uploadedAt)}
                                </span>
                                <span>{formatSize(v.size)}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="modal-actions">
                    <button className="btn-outline" onClick={onClose}>Close</button>
                    <button className="btn-primary" onClick={() => window.open(`${API_BASE}/api/files/${file._id}/download`, '_blank')}>
                        <Download size={18} /> Download
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilePreview;
