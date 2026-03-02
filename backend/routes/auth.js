const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Logout Mock
router.get('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

// Get current user (Mock user injected by authMiddleware)
router.get('/me', authMiddleware, (req, res) => {
    res.json({
        _id: req.user._id,
        displayName: req.user.displayName,
        email: req.user.email,
        avatar: req.user.avatar,
        storageUsed: req.user.storageUsed,
        createdAt: req.user.createdAt,
    });
});

module.exports = router;
