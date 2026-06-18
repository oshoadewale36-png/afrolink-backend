const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/register', async (req, res) => {

    try {
    const { name, email, password, age, gender, origin, city, bio } = req.body;
    const user = new User({ name, email, password, age, gender, origin, city, bio });
     await user.save();

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });
     res.status(201).json({ token, user: { id:user._id, name, email } });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invaild credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/register', [ 
    body('email'),isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name'),trim(),notEmpty(),
    // add more as needed
], async (req, res) => {
    const error = validationResult(req);
    if (!errors.isEmpty()) return 
    res.status(400).json({ errors: errors.array() });
    
    // restof your register code
});



module.exports = router;
