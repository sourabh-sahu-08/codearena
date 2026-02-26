import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Target, Save, Zap } from 'lucide-react';
import { Button, Card } from '../ui';
import { useHackathon } from '../../context/HackathonContextState';

export default function HackathonControl() {
    const { state, updateSettings } = useHackathon();
    const [isSaving, setIsSaving] = useState(false);
    const [localSettings, setLocalSettings] = useState(state.settings || {
        phase: 'Registration',
        activeTrack: 'Main Track',
        countdownEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    });

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateSettings(localSettings);
        } catch (error) {
            console.error('Failed to update settings:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Hackathon Control</h2>
                    <p className="text-slate-400">Manage global phases and track settings across the platform.</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2"
                >
                    <Save size={18} />
                    {isSaving ? 'Syncing...' : 'Sync Platform'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-6">
                    <div className="flex items-center gap-3 text-primary-custom">
                        <Zap size={24} />
                        <h3 className="font-bold text-lg">Active Phase</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {['Registration', 'Selection', 'Coding', 'Live', 'Completed'].map((p) => (
                            <button
                                key={p}
                                onClick={() => setLocalSettings(prev => ({ ...prev, phase: p as any }))}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${localSettings.phase === p
                                        ? 'bg-primary-custom/10 border-primary-custom text-primary-custom'
                                        : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                                    }`}
                            >
                                <span className="font-medium">{p}</span>
                                {localSettings.phase === p && <motion.div layoutId="activePhase" className="w-2 h-2 rounded-full bg-primary-custom shadow-[0_0_10px_#818cf8]" />}
                            </button>
                        ))}
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card className="p-6 space-y-4">
                        <div className="flex items-center gap-3 text-emerald-400">
                            <Target size={24} />
                            <h3 className="font-bold text-lg">Track Management</h3>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Active Track Name</label>
                            <input
                                type="text"
                                value={localSettings.activeTrack}
                                onChange={(e) => setLocalSettings(prev => ({ ...prev, activeTrack: e.target.value }))}
                                className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-custom/50"
                            />
                        </div>
                    </Card>

                    <Card className="p-6 space-y-4">
                        <div className="flex items-center gap-3 text-orange-400">
                            <Clock size={24} />
                            <h3 className="font-bold text-lg">Global Countdown</h3>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500">End Date & Time</label>
                            <input
                                type="datetime-local"
                                value={localSettings.countdownEndDate.split('.')[0]}
                                onChange={(e) => setLocalSettings(prev => ({ ...prev, countdownEndDate: new Date(e.target.value).toISOString() }))}
                                className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500/50"
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
