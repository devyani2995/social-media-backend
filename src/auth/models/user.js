const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: true,
        match: [/^.{6,}$/, 'Password must be at least 6 characters long']
    },
}, {
    timestamps: true //to show automatically createdAt and updatedAt
}
);

//pre-save hook to save the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
