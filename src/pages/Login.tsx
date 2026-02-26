
import { motion } from 'framer-motion';
import { Button } from '../components/ui';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
    return (
        <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="glass-card p-8 bg-secondary-custom/40">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-foreground-custom/40">Sign in to your CODEARENA account</p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground-custom/70 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-custom/30" size={18} />
                                <input
                                    type="email"
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
                                    className="w-full bg-background-custom/50 border border-border-custom rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button className="w-full py-4 group">
                            Sign In
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-border-custom text-center">
                        <p className="text-foreground-custom/40 text-sm">
                            Don't have an account?{' '}
                            <a href="#" className="text-primary font-medium hover:underline">Register now</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
