const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || "secret_key", {
      expiresIn: "1d",
    });
  };
  

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: Token missing' });
    }
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed: Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authenticate;
