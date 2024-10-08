const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    if (req.path === '/user/create' || req.path === '/user/login') {
        return next();
    }
    const token = req.headers['authorization'];
    if (!token) {
        res.locals.message = "Access Denied. No token provided.";
        return res.status(401).json();
    }
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.locals.message = "Invalid token";
        return res.status(400).json();

    }
};

module.exports = authMiddleware;