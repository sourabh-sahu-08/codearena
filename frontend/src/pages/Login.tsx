import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useHackathon } from '../context/HackathonContextState';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState<'user' | 'operator'>('user');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useHackathon();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            login(data.user, data.token);

            if (data.user.role === 'operator') {
                navigate('/operator-dashboard');
            } else {
                navigate('/dashboard');
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="glass-card p-8 bg-secondary-custom/40">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">
                            {loginType === 'operator' ? 'Operator Portal' : 'Welcome Back'}
                        </h1>
                        <p className="text-foreground-custom/40">
                            {loginType === 'operator' ? 'Manage Bharat\'s best talent' : 'Sign in to your CODEARENA account'}
                        </p>
                    </div>

                    <div className="flex p-1 bg-background-custom/50 border border-border-custom rounded-xl mb-8">
                        <button
                            onClick={() => setLoginType('user')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${loginType === 'user'
                                ? 'bg-primary-custom text-white shadow-lg shadow-primary-custom/20'
                                : 'text-foreground-custom/40 hover:text-foreground-custom'
                                }`}
                        >
                            Participant
                        </button>
                        <button
                            onClick={() => setLoginType('operator')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${loginType === 'operator'
                                ? 'bg-accent-custom text-white shadow-lg shadow-accent-custom/20'
                                : 'text-foreground-custom/40 hover:text-foreground-custom'
                                }`}
                        >
                            Operator
                        </button>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground-custom/70 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-custom/30" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-background-custom/50 border border-border-custom rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    placeholder="name@university.edu"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-sm font-medium text-foreground-custom/70">Password</label>
                                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-custom/30" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-background-custom/50 border border-border-custom rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button className={`w-full py-4 group ${loginType === 'operator' ? 'bg-accent-custom hover:opacity-90 border-none' : ''}`} disabled={isLoading}>
                            {isLoading ? 'Authenticating...' : `Sign In as ${loginType === 'operator' ? 'Operator' : 'Participant'}`}
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-border-custom text-center">
                        <p className="text-foreground-custom/40 text-sm">
                            Don't have an account?{' '}
                            <a href="/register" className="text-primary font-medium hover:underline">Register now</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
