import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'operator'],
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'pending'],
        default: 'active',
    },
    bio: {
        type: String,
        default: "I'm a passionate developer focused on building scalable web applications.",
    },
    createdAt: {

        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('User', userSchema);
