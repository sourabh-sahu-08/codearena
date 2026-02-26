import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, BrainCircuit, CheckCircle2, AlertCircle, Search, Monitor, Terminal } from 'lucide-react';
import { Card, Button } from '../ui';

const mockLiveSubmissions = [
    { id: 'S01', user: 'Sourabh Sahu', problem: 'Neural Synthesis', time: '1m ago', result: 'Success', status: 'Running', plagiarsim: '0%' },
    { id: 'S02', user: 'Alpha Force', problem: 'Quantum Routing', time: '4m ago', result: 'Compiling', status: 'Active', plagiarsim: '12%' },
    { id: 'S03', user: 'Dev Dynamic', problem: 'Neural Synthesis', time: '8m ago', result: 'Runtime Error', status: 'Failed', plagiarsim: '2%' },
];

export default function CodingRoundControl() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.3em] mb-2">Live Execution Monitor</p>
                    <h2 className="text-4xl font-black text-white tracking-tighter">Coding Rounds</h2>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-10 py-3 font-black text-[10px] uppercase tracking-widest">
                        Configure Problems
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 rounded-xl px-10 py-3 font-black text-[10px] uppercase tracking-widest">
                        Live Stream
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <Card className="lg:col-span-1 p-8 bg-white/5 border-white/5 rounded-[2.5rem] h-fit">
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                        <Clock className="text-emerald-400" size={20} />
                        Cycle Timing
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1.5">Remaining Duration</p>
                            <p className="text-4xl font-black text-white tracking-tighter tabular-nums text-gradient from-emerald-400 to-teal-500">
                                02:45:12
                            </p>
                        </div>
                        <div className="pt-6 border-t border-white/5 space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                                <span className="text-slate-500">Sync Status</span>
                                <span className="text-emerald-400">Stable</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                                <span className="text-slate-500">Load Factor</span>
                                <span className="text-blue-400">Normal</span>
                            </div>
                        </div>
                        <Button className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 py-4 font-black text-[10px] uppercase tracking-widest transition-all">
                            ABORT CURRENT ROUND
                        </Button>
                    </div>
                </Card>

                <Card className="lg:col-span-3 bg-white/5 border-white/5 overflow-hidden backdrop-blur-xl rounded-[2.5rem]">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Terminal size={22} className="text-emerald-400" />
                            <h3 className="text-xl font-bold text-white">Live Submission Feed</h3>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Receiving Packets</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Entity</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Logic module</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Result</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center text-gradient from-red-400 to-orange-500">Plagiarism</th>
                                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {mockLiveSubmissions.map((sub, i) => (
                                    <tr key={sub.id} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">{sub.user}</div>
                                            <div className="text-[10px] text-slate-500 font-mono tracking-widest">ID: {sub.id}</div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="text-sm font-bold text-slate-300">{sub.problem}</div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${sub.result === 'Success' ? 'text-emerald-400' : sub.result === 'Compiling' ? 'text-blue-400' : 'text-red-400'
                                                }`}>
                                                {sub.result === 'Success' ? <CheckCircle2 size={12} /> : sub.result === 'Compiling' ? <Monitor size={12} className="animate-pulse" /> : <AlertCircle size={12} />}
                                                {sub.result}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className={`font-mono font-black text-xs px-2 py-0.5 rounded-lg ${parseInt(sub.plagiarsim) > 10 ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'text-slate-500'
                                                }`}>
                                                {sub.plagiarsim}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right font-mono text-[10px] text-slate-500">
                                            {sub.time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
