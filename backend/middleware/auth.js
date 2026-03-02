const authMiddleware = async (req, res, next) => {
    try {
        // Mock offline mode: Attach a fake user object directly without querying the DB
        req.user = {
            _id: 'mock-user-123',
            displayName: 'Guest User',
            email: 'guest@cloudvault.local',
            avatar: 'https://ui-avatars.com/api/?name=Guest+User&background=1E2E20&color=AEB784',
            storageUsed: 0
        };

        next();
    } catch (err) {
        return res.status(401).json({ error: 'Auth middleware error: ' + err.message });
    }
};

module.exports = authMiddleware;
