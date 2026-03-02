import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        // Mock offline mode: Force logged in state immediately
        setUser({
            _id: 'mock-user-123',
            displayName: 'Guest User',
            email: 'guest@cloudvault.local',
            avatar: 'https://ui-avatars.com/api/?name=Guest+User&background=1E2E20&color=AEB784',
            storageUsed: 0
        });
        setLoading(false);
    };

    const login = () => {
        alert("You are automatically logged in as a Guest User for this offline mode!");
    };

    const logout = () => {
        alert("Logout disabled in offline mock mode.");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshUser: checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
