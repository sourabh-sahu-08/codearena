import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/codearena';

const seed = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing users
        await User.deleteMany({});
        console.log('Cleared existing users.');

        const hashedPassword = await bcrypt.hash('password123', 12);

        // Create a User
        const user = new User({
            name: 'Regular User',
            email: 'user@example.com',
            password: hashedPassword,
            role: 'user'
        });

        // Create an Operator
        const operator = new User({
            name: 'System Operator',
            email: 'operator@example.com',
            password: hashedPassword,
            role: 'operator'
        });

        await user.save();
        await operator.save();

        console.log('Seeded User: user@example.com / password123');
        console.log('Seeded Operator: operator@example.com / password123');

        mongoose.connection.close();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seed();
