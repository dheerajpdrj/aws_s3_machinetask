const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log("user", user);
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("isMatch", isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ id: user._id, username: user.username }, 'secret_key', { expiresIn: '1d' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
