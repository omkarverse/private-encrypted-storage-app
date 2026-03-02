const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    version: Number,
    data: Buffer,
    size: Number,
    uploadedAt: { type: Date, default: Date.now },
}, { _id: false });

const fileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['Photo', 'Document', 'PDF', 'SourceCode'],
        default: 'Document',
    },
    data: {
        type: Buffer,
        required: true,
    },
    version: {
        type: Number,
        default: 1,
    },
    versions: [versionSchema],
    shareToken: {
        type: String,
        default: null,
    },
    isShared: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Auto-detect category from MIME type
fileSchema.statics.detectCategory = function (mimeType, fileName) {
    if (mimeType.startsWith('image/')) return 'Photo';
    if (mimeType === 'application/pdf') return 'PDF';

    const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.h',
        '.html', '.css', '.json', '.xml', '.yaml', '.yml', '.sh', '.bat', '.rb',
        '.go', '.rs', '.php', '.sql', '.md', '.swift', '.kt'];
    const ext = '.' + fileName.split('.').pop().toLowerCase();
    if (codeExtensions.includes(ext)) return 'SourceCode';

    return 'Document';
};

module.exports = mongoose.model('File', fileSchema);
