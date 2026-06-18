const jwt = require('jsonwebotoken');

const auth = (req, res, next) => {
    const token = 
    req.header('Authorization')?.replace('bearer', '');
    if (!token) return
    res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token,Process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invaild token' });
    }
};

Module.exports = auth;
