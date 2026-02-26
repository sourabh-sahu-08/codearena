import React from 'react';
import { motion } from 'framer-motion';
import { Users, BrainCircuit, Shield, ShieldAlert, BarChart3, Bell, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Card, Button } from '../ui';
import { useHackathon } from '../../context/HackathonContextState';

export default function AdminOverview() {
    const { state } = useHackathon();

    const mainStats = [
        { label: 'Total Participants', value: state.stats.participants.toLocaleString(), icon: Users, color: 'from-blue-500 to-cyan-400', trend: '+12.5%' },
        { label: 'Active Sessions', value: state.stats.activeSubmissions.toString(), icon: BrainCircuit, color: 'from-purple-500 to-pink-500', trend: 'Live' },
        { label: 'Server Stability', value: `${state.stats.serverLoad}%`, icon: Shield, color: 'from-emerald-500 to-teal-400', trend: 'Optimal' },
        { label: 'Pending Approvals', value: '12', icon: ShieldAlert, color: 'from-orange-500 to-yellow-400', trend: 'Priority' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-blue-400 font-bold text-xs uppercase tracking-[0.3em] mb-2">Platform Overview</p>
                    <h2 className="text-4xl font-black text-white tracking-tighter">Command Center</h2>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-6 py-2.5 font-bold text-sm">Download Report</Button>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 rounded-xl px-6 py-2.5 font-bold text-sm">Live Feed</Button>
                </div>
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mainStats.map((stat, i) => (
                    <Card key={i} className="relative p-6 bg-white/5 border-white/5 backdrop-blur-xl group hover:border-blue-500/30 transition-all duration-500 overflow-hidden rounded-[2rem]">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] blur-3xl transition-opacity`} />
                        <div className="flex items-center justify-between mb-6">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                                <stat.icon size={22} />
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                        <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '70' + (i * 5) + '%' }}
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                                className={`h-full bg-gradient-to-r ${stat.color}`}
                            />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts and Pulse */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 p-8 bg-white/5 border-white/5 min-h-[400px] rounded-[2rem]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <BarChart3 className="text-blue-400" size={20} />
                                Platform Growth
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">Real-time participation metrics</p>
                        </div>
                        <div className="flex gap-2">
                            {['7D', '30D', 'ALL'].map(t => (
                                <button key={t} className={`px-4 py-2 text-[10px] font-black rounded-lg transition-all ${t === '7D' ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-500 hover:text-white'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-[280px] border border-dashed border-white/10 rounded-3xl bg-white/[0.01] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/[0.02] to-transparent" />
                        <TrendingUp size={48} className="text-blue-500/20 mb-4 group-hover:scale-110 transition-transform" />
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Analytics Engine Initializing</p>
                        <p className="text-[10px] text-slate-600 mt-1">Fetching live stream from Bharat data centers...</p>
                    </div>
                </Card>

                <Card className="p-8 bg-white/5 border-white/5 rounded-[2rem]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <Bell className="text-purple-400" size={20} />
                                Live Pulse
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">System-wide activity</p>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                    </div>
                    <div className="space-y-6">
                        {[
                            { user: 'Alpha Team', action: 'submitted problem 04', time: '2m ago', color: 'text-blue-400' },
                            { user: 'Sourabh Sahu', action: 'applied for verification', time: '15m ago', color: 'text-purple-400' },
                            { user: 'System', action: 'backup completed', time: '1h ago', color: 'text-emerald-400' },
                            { user: 'Judges', action: 'started round 02 scoring', time: '3h ago', color: 'text-orange-400' },
                        ].map((pulse, i) => (
                            <div key={i} className="flex gap-4 relative group">
                                {i !== 3 && <div className="absolute left-[7px] top-6 w-[2px] h-10 bg-white/5 group-hover:bg-blue-500/20 transition-colors" />}
                                <div className="w-4 h-4 rounded-full bg-[#020617] border-2 border-white/10 mt-1 relative z-10 transition-transform group-hover:scale-125">
                                    <div className={`w-full h-full rounded-full animate-ping opacity-20 ${pulse.color.replace('text', 'bg')}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-200 leading-tight mb-1">
                                        <span className={`${pulse.color} hover:underline cursor-pointer`}>{pulse.user}</span> {pulse.action}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
                                        {pulse.time}
                                        <span className="w-1 h-1 rounded-full bg-white/10" />
                                        Global
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="w-full mt-10 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all">
                        Interrogate System Logs
                    </Button>
                </Card>
            </div>
        </div>
    );
}
