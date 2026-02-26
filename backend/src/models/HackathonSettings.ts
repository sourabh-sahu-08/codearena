import mongoose from 'mongoose';

const hackathonSettingsSchema = new mongoose.Schema({
    phase: {
        type: String,
        enum: ['Registration', 'Selection', 'Coding', 'Live', 'Completed'],
        default: 'Registration',
    },
    activeTrack: {
        type: String,
        default: 'Main Track',
    },
    countdownEndDate: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

export default mongoose.model('HackathonSettings', hackathonSettingsSchema);
