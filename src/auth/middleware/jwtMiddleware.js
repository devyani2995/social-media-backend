const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    //it will check in header whether authorization token is coming or not
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
        req.user = decoded; // Attach the user information to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

module.exports = authenticateToken;
