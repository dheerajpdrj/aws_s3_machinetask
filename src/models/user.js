const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bucket: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Bucket", required: true },
      ],
});

module.exports = mongoose.model('User', userSchema);
