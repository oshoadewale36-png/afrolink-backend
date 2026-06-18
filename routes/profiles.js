const express = require('express');
const user = require('../models/user');
const router = express.Router();

// Middeware to verify token
const auth = (req, res, next) => {
    const token =
    req.header('Authorization')?.replace('Bearer', '');
    if (!token) return
    res.status(401).json({ error: 'No token' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).josn({ error: 'Invalid token' });
    }
};

router.get('/', auth, async (req, res) => {
    const { origin, gender } = req.query;
    let filter = { _id: { $ne: req.userId } };
    if (origin) filter.origin = origin;
    if (gender) filter.gender = gender;

    const profiles =  await user.find(filter).select('-password');
    res.json(profiles);
});

module.exports = router;
