import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, FileText, File, Code, HardDrive } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ total: 0, photos: 0, documents: 0, pdfs: 0, code: 0 });

    useEffect(() => {
        if (!authLoading && !user) navigate('/');
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (user) fetchStats();
    }, [user]);

    const fetchStats = async () => {
        try {
            const { data } = await axios.get(`${API_BASE}/api/files`, { withCredentials: true });
            setStats({
                total: data.length,
                photos: data.filter(f => f.category === 'Photo').length,
                documents: data.filter(f => f.category === 'Document').length,
                pdfs: data.filter(f => f.category === 'PDF').length,
                code: data.filter(f => f.category === 'SourceCode').length,
            });
        } catch { /* ignore */ }
    };

    const formatBytes = (bytes) => {
        if (!bytes) return '0 B';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    if (authLoading) {
        return <div className="loading"><div className="loading-spinner"></div><br />Loading...</div>;
    }

    if (!user) return null;

    return (
        <div className="profile-page">
            <h1 className="page-title">My Profile</h1>

            <div className="profile-hero glass-panel">
                <div className="profile-banner"></div>
                <div className="profile-content">
                    <div className="profile-avatar-wrapper">
                        <img
                            src={user.avatar}
                            alt={user.displayName}
                            className="profile-avatar"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=AEB784&color=41431B&size=200&bold=true`;
                            }}
                        />
                    </div>
                    <h2 className="profile-name">{user.displayName}</h2>
                    <p className="profile-email">{user.email}</p>

                    <div className="profile-stats-grid">
                        <div className="profile-stat">
                            <span className="profile-stat-num">{stats.total}</span>
                            <span className="profile-stat-label">Total Files</span>
                        </div>
                        <div className="profile-stat">
                            <span className="profile-stat-num"><HardDrive size={20} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} />{formatBytes(user.storageUsed)}</span>
                            <span className="profile-stat-label">Storage Used</span>
                        </div>
                        <div className="profile-stat">
                            <span className="profile-stat-num" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                                <Image size={18} /> {stats.photos}
                            </span>
                            <span className="profile-stat-label">Photos</span>
                        </div>
                        <div className="profile-stat">
                            <span className="profile-stat-num" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                                <FileText size={18} /> {stats.documents}
                            </span>
                            <span className="profile-stat-label">Documents</span>
                        </div>
                        <div className="profile-stat">
                            <span className="profile-stat-num" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                                <File size={18} /> {stats.pdfs}
                            </span>
                            <span className="profile-stat-label">PDFs</span>
                        </div>
                        <div className="profile-stat">
                            <span className="profile-stat-num" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                                <Code size={18} /> {stats.code}
                            </span>
                            <span className="profile-stat-label">Source Code</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
