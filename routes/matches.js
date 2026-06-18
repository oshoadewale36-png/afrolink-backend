const express = require('express');
const User = require('../models/user');
const { route } = require('./auth');
const routter = express.Router();

// Add like / match logic here
router.post('/like/:targetId', auth,  async (req, res) => {
const user = await User.findById(req.userId);
const target = await User.findById(req.params.targetId);

user.likes.push(target._id);
await user.save();

// Check if mutual
if (target.likes.includes(user.id)) {
    user.matches.push(target._id);
    target.matches.push(user._id);
    await Promise.all([user.save(), target.save()]);
    // Emit via Socket.oi if connected
    return res.json({ match: true, message: 'It`s a match!' });
}
res.json({ match: false });
}),

module.exports = router;
