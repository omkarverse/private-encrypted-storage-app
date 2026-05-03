// const express = require('express');
// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
// const authMiddleware = require('../middleware/auth');

// const router = express.Router();

// // Mock Database replacing MongoDB Atlas and Mongoose
// let IN_MEMORY_FILES = [];

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('video/')) {
//             return cb(new Error('Video files are not allowed'), false);
//         }
//         cb(null, true);
//     },
// });

// const detectCategory = (mimeType, filename) => {
//     if (mimeType.startsWith('image/')) return 'Photo';
//     if (mimeType === 'application/pdf') return 'PDF';
//     if (mimeType.includes('document') || mimeType.includes('msword') || mimeType.includes('text/plain')) return 'Document';
//     return 'SourceCode'; // fallback
// };

// // Upload file
// router.post('/upload', authMiddleware, (req, res) => {
//     upload.single('file')(req, res, async (err) => {
//         if (err) return res.status(400).json({ error: err.message });
//         if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

//         try {
//             const newFile = {
//                 _id: uuidv4(),
//                 userId: req.user._id,
//                 originalName: req.file.originalname,
//                 mimeType: req.file.mimetype,
//                 size: req.file.size,
//                 category: detectCategory(req.file.mimetype, req.file.originalname),
//                 data: req.file.buffer, // Save binary buffer straight to memory
//                 version: 1,
//                 versions: [],
//                 isShared: false,
//                 shareToken: null,
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//             };

//             IN_MEMORY_FILES.push(newFile);
//             req.user.storageUsed += req.file.size; // Fake update storage string

//             const fileData = { ...newFile };
//             delete fileData.data; delete fileData.versions;
//             res.status(201).json(fileData);
//         } catch (error) {
//             res.status(500).json({ error: 'Failed to upload' });
//         }
//     });
// });

// // List user's files
// router.get('/', authMiddleware, async (req, res) => {
//     try {
//         let files = IN_MEMORY_FILES.filter(f => f.userId === req.user._id);

//         if (req.query.category && req.query.category !== 'All') {
//             files = files.filter(f => f.category === req.query.category);
//         }
//         if (req.query.search) {
//             files = files.filter(f => f.originalName.toLowerCase().includes(req.query.search.toLowerCase()));
//         }

//         const stripped = files.map(f => {
//             const copy = { ...f };
//             delete copy.data; delete copy.versions;
//             return copy;
//         }).sort((a, b) => b.createdAt - a.createdAt);

//         res.json(stripped);
//     } catch (err) {
//         res.status(500).json({ error: 'Error fetching files' });
//     }
// });

// // Get metadata
// router.get('/:id', authMiddleware, async (req, res) => {
//     const file = IN_MEMORY_FILES.find(f => f._id === req.params.id && f.userId === req.user._id);
//     if (!file) return res.status(404).json({ error: 'Not found' });
//     const copy = { ...file }; delete copy.data;
//     res.json(copy);
// });

// // Download
// router.get('/:id/download', authMiddleware, async (req, res) => {
//     const file = IN_MEMORY_FILES.find(f => f._id === req.params.id && f.userId === req.user._id);
//     if (!file) return res.status(404).json({ error: 'Not found' });
//     res.set({
//         'Content-Type': file.mimeType,
//         'Content-Disposition': `attachment; filename="${file.originalName}"`,
//         'Content-Length': file.size,
//     });
//     res.send(file.data);
// });

// // Preview
// router.get('/:id/preview', authMiddleware, async (req, res) => {
//     const file = IN_MEMORY_FILES.find(f => f._id === req.params.id && f.userId === req.user._id);
//     if (!file) return res.status(404).json({ error: 'Not found' });
//     res.set({
//         'Content-Type': file.mimeType,
//         'Content-Disposition': `inline; filename="${file.originalName}"`,
//         'Content-Length': file.size,
//     });
//     res.send(file.data);
// });

// // Share link
// router.post('/:id/share', authMiddleware, async (req, res) => {
//     const file = IN_MEMORY_FILES.find(f => f._id === req.params.id && f.userId === req.user._id);
//     if (!file) return res.status(404).json({ error: 'Not found' });
//     if (file.isShared) {
//         file.isShared = false;
//         file.shareToken = null;
//     } else {
//         file.isShared = true;
//         file.shareToken = uuidv4();
//     }
//     const copy = { ...file }; delete copy.data;
//     res.json(copy);
// });

// // Delete
// router.delete('/:id', authMiddleware, async (req, res) => {
//     const idx = IN_MEMORY_FILES.findIndex(f => f._id === req.params.id && f.userId === req.user._id);
//     if (idx === -1) return res.status(404).json({ error: 'Not found' });
//     IN_MEMORY_FILES.splice(idx, 1);
//     res.json({ message: 'Deleted' });
// });

// // Public shared download (no auth)
// router.get('/shared/:shareToken', async (req, res) => {
//     const file = IN_MEMORY_FILES.find(f => f.shareToken === req.params.shareToken && f.isShared);
//     if (!file) return res.status(404).json({ error: 'Shared file not found or sharing disabled' });

//     if (req.query.download === 'true') {
//         res.set({
//             'Content-Type': file.mimeType,
//             'Content-Disposition': `attachment; filename="${file.originalName}"`,
//             'Content-Length': file.size,
//         });
//         return res.send(file.data);
//     }
//     res.json({
//         originalName: file.originalName,
//         mimeType: file.mimeType,
//         size: file.size,
//         category: file.category,
//         createdAt: file.createdAt,
//     });
// });

// module.exports = router;
const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto'); // Node built-in — no install needed
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// ─── Encryption Config ───────────────────────────────────────────────────────
// AES-256-CBC requires a 32-byte key and a 16-byte IV
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
    ? Buffer.from(process.env.ENCRYPTION_KEY, 'hex')
    : crypto.randomBytes(32); // fallback for dev (changes on restart)

const ALGORITHM = 'aes-256-cbc';

function encryptBuffer(buffer) {
    const iv = crypto.randomBytes(16); // fresh IV per file
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    // Prepend IV to encrypted data so we can decrypt later
    return { encrypted: Buffer.concat([iv, encrypted]), iv: iv.toString('hex') };
}

function decryptBuffer(encryptedBuffer) {
    const iv = encryptedBuffer.slice(0, 16);         // first 16 bytes = IV
    const data = encryptedBuffer.slice(16);           // rest = encrypted content
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    return Buffer.concat([decipher.update(data), decipher.final()]);
}

// ─── Vault Path ───────────────────────────────────────────────────────────────
const VAULT_DIR = path.join(__dirname, '..', 'encrypted-vault');

// ─── In-Memory File Registry ──────────────────────────────────────────────────
// Stores metadata only — actual file bytes live in encrypted-vault/ as .enc files
let IN_MEMORY_FILES = [];

// ─── Multer ───────────────────────────────────────────────────────────────────
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
    if (mimeType.includes('document') || mimeType.includes('msword') || mimeType.includes('text/')) return 'Document';
    return 'SourceCode';
};

// ─── UPLOAD ───────────────────────────────────────────────────────────────────
router.post('/upload', authMiddleware, (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        try {
            const fileId = uuidv4();

            // 🔐 ENCRYPT the file buffer using AES-256-CBC
            const { encrypted, iv } = encryptBuffer(req.file.buffer);

            // 💾 Save .enc file to encrypted-vault/
            const encFilename = `${fileId}.enc`;
            const encFilePath = path.join(VAULT_DIR, encFilename);
            fs.writeFileSync(encFilePath, encrypted);

            // 📋 Store metadata in memory (no raw bytes stored in memory)
            const newFile = {
                _id: fileId,
                userId: req.user._id,
                originalName: req.file.originalname,
                mimeType: req.file.mimetype,
                size: req.file.size,
                category: detectCategory(req.file.mimetype, req.file.originalname),
                encFilename,      // pointer to encrypted file on disk
                iv,               // stored for reference (already embedded in file too)
                encryptionAlgo: 'AES-256-CBC',
                version: 1,
                isShared: false,
                shareToken: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            IN_MEMORY_FILES.push(newFile);

            // Return safe metadata (no raw bytes, no key)
            const { encFilename: _e, iv: _iv, ...safeFile } = newFile;
            res.status(201).json({
                ...safeFile,
                encryptedAs: encFilename,
                message: '🔐 File encrypted with AES-256-CBC and stored securely in vault.'
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ error: 'Failed to encrypt and store file: ' + error.message });
        }
    });
});

// ─── LIST FILES ───────────────────────────────────────────────────────────────
router.get('/', authMiddleware, async (req, res) => {
    try {
        let files = IN_MEMORY_FILES.filter(f => f.userId === req.user._id);

        if (req.query.category && req.query.category !== 'All') {
            files = files.filter(f => f.category === req.query.category);
        }
        if (req.query.search) {
            files = files.filter(f =>
                f.originalName.toLowerCase().includes(req.query.search.toLowerCase())
            );
        }

        const safeFiles = files
            .map(f => {
                const { encFilename, iv, ...safe } = f;
                return safe;
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json(safeFiles);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching files' });
    }
});

// ─── GET METADATA ─────────────────────────────────────────────────────────────
router.get('/:id', authMiddleware, async (req, res) => {
    const file = IN_MEMORY_FILES.find(f => f._id === req.params.id && f.userId === req.user._id);
    if (!file) return res.status(404).json({ error: 'Not found' });
    const { encFilename, iv, ...safe } = file;
    res.json(safe);
});

// ─── DOWNLOAD (decrypt on the fly) ───────────────────────────────────────────
router.get('/:id/download', authMiddleware, async (req, res) => {
    const file = IN_MEMORY_FILES.find(f => f._id === req.params.id && f.userId === req.user._id);
    if (!file) return res.status(404).json({ error: 'Not found' });

    try {
        const encFilePath = path.join(VAULT_DIR, file.encFilename);
        const encryptedBuffer = fs.readFileSync(encFilePath);
        const decrypted = decryptBuffer(encryptedBuffer); // 🔓 Decrypt on-the-fly

        res.set({
            'Content-Type': file.mimeType,
            'Content-Disposition': `attachment; filename="${file.originalName}"`,
            'Content-Length': decrypted.length,
        });
        res.send(decrypted);
    } catch (e) {
        res.status(500).json({ error: 'Decryption failed: ' + e.message });
    }
});

// ─── PREVIEW ─────────────────────────────────────────────────────────────────
router.get('/:id/preview', authMiddleware, async (req, res) => {
    const file = IN_MEMORY_FILES.find(f => f._id === req.params.id && f.userId === req.user._id);
    if (!file) return res.status(404).json({ error: 'Not found' });

    try {
        const encFilePath = path.join(VAULT_DIR, file.encFilename);
        const encryptedBuffer = fs.readFileSync(encFilePath);
        const decrypted = decryptBuffer(encryptedBuffer);

        res.set({
            'Content-Type': file.mimeType,
            'Content-Disposition': `inline; filename="${file.originalName}"`,
            'Content-Length': decrypted.length,
        });
        res.send(decrypted);
    } catch (e) {
        res.status(500).json({ error: 'Decryption failed: ' + e.message });
    }
});

// ─── SHARE ────────────────────────────────────────────────────────────────────
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

    const { encFilename, iv, ...safe } = file;
    res.json(safe);
});

// ─── DELETE ───────────────────────────────────────────────────────────────────
router.delete('/:id', authMiddleware, async (req, res) => {
    const idx = IN_MEMORY_FILES.findIndex(f => f._id === req.params.id && f.userId === req.user._id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });

    const file = IN_MEMORY_FILES[idx];
    // Also delete the .enc file from vault
    try {
        const encFilePath = path.join(VAULT_DIR, file.encFilename);
        if (fs.existsSync(encFilePath)) fs.unlinkSync(encFilePath);
    } catch (e) {
        console.warn('Could not delete enc file:', e.message);
    }

    IN_MEMORY_FILES.splice(idx, 1);
    res.json({ message: 'File deleted and removed from vault' });
});

// ─── PUBLIC SHARED DOWNLOAD ───────────────────────────────────────────────────
router.get('/shared/:shareToken', async (req, res) => {
    const file = IN_MEMORY_FILES.find(f => f.shareToken === req.params.shareToken && f.isShared);
    if (!file) return res.status(404).json({ error: 'Shared file not found or sharing disabled' });

    if (req.query.download === 'true') {
        try {
            const encFilePath = path.join(VAULT_DIR, file.encFilename);
            const encryptedBuffer = fs.readFileSync(encFilePath);
            const decrypted = decryptBuffer(encryptedBuffer);

            res.set({
                'Content-Type': file.mimeType,
                'Content-Disposition': `attachment; filename="${file.originalName}"`,
                'Content-Length': decrypted.length,
            });
            return res.send(decrypted);
        } catch (e) {
            return res.status(500).json({ error: 'Decryption failed' });
        }
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
