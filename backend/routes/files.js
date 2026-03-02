const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Mock Database replacing MongoDB Atlas and Mongoose
let IN_MEMORY_FILES = [];

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('video/')) {
            return cb(new Error('Video files are not allowed'), false);
        }
        cb(null, true);
    },
});

const detectCategory = (mimeType, filename) => {
    if (mimeType.startsWith('image/')) return 'Photo';
    if (mimeType === 'application/pdf') return 'PDF';
    if (mimeType.includes('document') || mimeType.includes('msword') || mimeType.includes('text/plain')) return 'Document';
    return 'SourceCode'; // fallback
};

// Upload file
router.post('/upload', authMiddleware, (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        try {
            const newFile = {
                _id: uuidv4(),
                userId: req.user._id,
                originalName: req.file.originalname,
                mimeType: req.file.mimetype,
                size: req.file.size,
                category: detectCategory(req.file.mimetype, req.file.originalname),
                data: req.file.buffer, // Save binary buffer straight to memory
                version: 1,
                versions: [],
                isShared: false,
                shareToken: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            IN_MEMORY_FILES.push(newFile);
            req.user.storageUsed += req.file.size; // Fake update storage string

            const fileData = { ...newFile };
            delete fileData.data; delete fileData.versions;
            res.status(201).json(fileData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to upload' });
        }
    });
});

// List user's files
router.get('/', authMiddleware, async (req, res) => {
    try {
        let files = IN_MEMORY_FILES.filter(f => f.userId === req.user._id);

        if (req.query.category && req.query.category !== 'All') {
            files = files.filter(f => f.category === req.query.category);
        }
        if (req.query.search) {
            files = files.filter(f => f.originalName.toLowerCase().includes(req.query.search.toLowerCase()));
        }

        const stripped = files.map(f => {
            const copy = { ...f };
            delete copy.data; delete copy.versions;
            return copy;
        }).sort((a, b) => b.createdAt - a.createdAt);

        res.json(stripped);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching files' });
    }
});

// Get metadata
router.get('/:id', authMiddleware, async (req, res) => {
    const file = IN_MEMORY_FILES.find(f => f._id === req.params.id && f.userId === req.user._id);
    if (!file) return res.status(404).json({ error: 'Not found' });
    const copy = { ...file }; delete copy.data;
    res.json(copy);
});

// Download
router.get('/:id/download', authMiddleware, async (req, res) => {
    const file = IN_MEMORY_FILES.find(f => f._id === req.params.id && f.userId === req.user._id);
    if (!file) return res.status(404).json({ error: 'Not found' });
    res.set({
        'Content-Type': file.mimeType,
        'Content-Disposition': `attachment; filename="${file.originalName}"`,
        'Content-Length': file.size,
    });
    res.send(file.data);
});

// Preview
router.get('/:id/preview', authMiddleware, async (req, res) => {
    const file = IN_MEMORY_FILES.find(f => f._id === req.params.id && f.userId === req.user._id);
    if (!file) return res.status(404).json({ error: 'Not found' });
    res.set({
        'Content-Type': file.mimeType,
        'Content-Disposition': `inline; filename="${file.originalName}"`,
        'Content-Length': file.size,
    });
    res.send(file.data);
});

// Share link
router.post('/:id/share', authMiddleware, async (req, res) => {
    const file = IN_MEMORY_FILES.find(f => f._id === req.params.id && f.userId === req.user._id);
    if (!file) return res.status(404).json({ error: 'Not found' });
    if (file.isShared) {
        file.isShared = false;
        file.shareToken = null;
    } else {
        file.isShared = true;
        file.shareToken = uuidv4();
    }
    const copy = { ...file }; delete copy.data;
    res.json(copy);
});

// Delete
router.delete('/:id', authMiddleware, async (req, res) => {
    const idx = IN_MEMORY_FILES.findIndex(f => f._id === req.params.id && f.userId === req.user._id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    IN_MEMORY_FILES.splice(idx, 1);
    res.json({ message: 'Deleted' });
});

// Public shared download (no auth)
router.get('/shared/:shareToken', async (req, res) => {
    const file = IN_MEMORY_FILES.find(f => f.shareToken === req.params.shareToken && f.isShared);
    if (!file) return res.status(404).json({ error: 'Shared file not found or sharing disabled' });

    if (req.query.download === 'true') {
        res.set({
            'Content-Type': file.mimeType,
            'Content-Disposition': `attachment; filename="${file.originalName}"`,
            'Content-Length': file.size,
        });
        return res.send(file.data);
    }
    res.json({
        originalName: file.originalName,
        mimeType: file.mimeType,
        size: file.size,
        category: file.category,
        createdAt: file.createdAt,
    });
});

module.exports = router;
