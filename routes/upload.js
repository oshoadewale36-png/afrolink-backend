const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const auth = require('../middleware/auth');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', auth, upload.single('photo'), async (req, res) => {
    try {
        const result = await
        cloudinary.uploader.upload_stream(
            { folder: 'afrolink' },
            (error,result) => { /* handle */ }
        ).end(req.file.buffer); // Simplified - use proper async upload
        res.json({ url: result.secure_url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
