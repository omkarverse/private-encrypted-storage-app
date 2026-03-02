import React from 'react';
import { Download, Share2, Trash2, History, Image, FileText, File, Code, Eye, Link2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const categoryIcons = {
    Photo: Image,
    Document: FileText,
    PDF: File,
    SourceCode: Code,
};

function FileCard({ file, onDelete, onShare, onPreview }) {
    const Icon = categoryIcons[file.category] || File;

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

    const handleDownload = () => {
        window.open(`${API_BASE}/api/files/${file._id}/download`, '_blank');
    };

    const handleCopyLink = () => {
        const link = `${window.location.origin}/shared/${file.shareToken}`;
        navigator.clipboard.writeText(link);
    };

    return (
        <div className="file-card glass-panel">
            <div className="file-card-header">
                <div className={`file-type-icon ${file.category.toLowerCase()}`}>
                    <Icon size={24} />
                </div>
                <div className="file-info">
                    <div className="file-name">{file.originalName}</div>
                    <div className="file-meta">
                        <span className="file-meta-tag">{file.category}</span>
                        <span className="file-meta-tag">{formatSize(file.size)}</span>
                        {file.version > 1 && (
                            <span className="file-meta-tag">
                                <History size={11} style={{ marginRight: '2px' }} />
                                v{file.version}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="file-card-body">
                <div className="file-date">{formatDate(file.createdAt)}</div>
                {file.isShared && (
                    <div className="file-date" style={{ color: 'var(--accent)', fontWeight: 500, marginTop: '0.3rem' }}>
                        <Link2 size={12} style={{ marginRight: '3px' }} /> Shared
                    </div>
                )}
            </div>

            <div className="file-card-actions">
                <button className="btn-small" onClick={handleDownload} title="Download">
                    <Download size={14} /> Download
                </button>
                {file.category === 'Photo' && (
                    <button className="btn-small" onClick={() => onPreview(file)} title="Preview">
                        <Eye size={14} /> Preview
                    </button>
                )}
                <button className="btn-small" onClick={() => onShare(file._id)} title={file.isShared ? 'Unshare' : 'Share'}>
                    <Share2 size={14} /> {file.isShared ? 'Unshare' : 'Share'}
                </button>
                {file.isShared && (
                    <button className="btn-small" onClick={handleCopyLink} title="Copy Link" style={{ background: 'rgba(174,183,132,0.25)' }}>
                        <Link2 size={14} /> Copy Link
                    </button>
                )}
                <button className="btn-danger" onClick={() => onDelete(file._id)} title="Delete">
                    <Trash2 size={14} /> Delete
                </button>
            </div>
        </div>
    );
}

export default FileCard;
