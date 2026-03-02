require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const User = require('./models/User'); // Imported User model for mock auth

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5174', // Default to Vite port 5174 or 5173
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Database connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/cloudvault';
mongoose.connect(mongoURI)
    .then(async () => {
        console.log('✅ MongoDB connected');
        // Ensure mock user exists for bypassed auth
        const existingUser = await User.findOne({ email: 'guest@cloudvault.local' });
        if (!existingUser) {
            await User.create({
                googleId: 'mock-google-id',
                displayName: 'Guest User',
                email: 'guest@cloudvault.local',
                avatar: 'https://ui-avatars.com/api/?name=Guest+User&background=1E2E20&color=AEB784',
                storageUsed: 0
            });
            console.log('✅ Mock user created');
        }
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'CloudVault API is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
