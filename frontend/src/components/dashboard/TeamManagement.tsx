import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, ShieldAlert, CheckCircle2, XCircle, Search, Filter, MoreHorizontal, Activity } from 'lucide-react';
import { Card, Button } from '../ui';

const mockTeams = [
    { id: 'T01', name: 'Cyber Phantoms', members: 4, leader: 'Sourabh Sahu', track: 'AI/ML', status: 'Approved', activity: 85 },
    { id: 'T02', name: 'Web Wizardry', members: 3, leader: 'Priya Sharma', track: 'Web3', status: 'Pending', activity: 40 },
    { id: 'T03', name: 'Ethical Avengers', members: 4, leader: 'Rahul Verma', track: 'Cybersecurity', status: 'Disqualified', activity: 10 },
    { id: 'T04', name: 'FinTech Titans', members: 2, leader: 'Anjali Goel', track: 'FinTech', status: 'Incomplete', activity: 60 },
];

export default function TeamManagement() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <p className="text-purple-400 font-bold text-xs uppercase tracking-[0.3em] mb-2">Division Oversight</p>
                    <h2 className="text-4xl font-black text-white tracking-tighter">Team Control</h2>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search team clusters..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500/50 transition-all focus:bg-white/10 text-white placeholder:text-slate-600"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Active Teams', value: '42', icon: Activity, color: 'text-blue-400' },
                    { label: 'Pending Review', value: '08', icon: ShieldAlert, color: 'text-orange-400' },
                    { label: 'Formed Clusters', value: '156', icon: Users, color: 'text-purple-400' },
                ].map((stat, i) => (
                    <Card key={i} className="bg-white/5 border-white/5 p-6 rounded-[2rem] flex items-center justify-between group hover:border-purple-500/30 transition-all">
                        <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-white leading-none">{stat.value}</p>
                        </div>
                        <div className={`p-4 rounded-2xl bg-white/5 ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="bg-white/5 border-white/5 overflow-hidden backdrop-blur-xl rounded-[2rem]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Team Entity</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Track & Leader</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Engagement</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockTeams.map((team, i) => (
                                <motion.tr
                                    key={team.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-white/[0.02] transition-colors group"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-black text-purple-400">
                                                    {team.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#020617] rounded-lg border border-white/5 flex items-center justify-center text-[10px] font-bold text-white">
                                                    {team.members}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-white group-hover:text-purple-400 transition-colors">{team.name}</div>
                                                <div className="text-[10px] text-slate-500 font-mono tracking-wider">ID: {team.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-bold text-slate-300">{team.leader}</div>
                                        <div className="text-[10px] text-blue-400 font-black uppercase tracking-widest mt-1">{team.track}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-xs font-bold text-white">{team.activity}%</span>
                                            <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                                    style={{ width: `${team.activity}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${team.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-400/20' :
                                                team.status === 'Pending' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    team.status === 'Incomplete' ? 'bg-orange-500/10 text-orange-400 border-orange-400/20' :
                                                        'bg-red-500/10 text-red-400 border-red-400/20'
                                            }`}>
                                            {team.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="sm" className="p-2.5 rounded-xl border border-white/5 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                                                <CheckCircle2 size={18} />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="p-2.5 rounded-xl border border-white/5 hover:bg-red-500/10 hover:text-red-400 transition-all">
                                                <XCircle size={18} />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="p-2.5 rounded-xl border border-white/5 hover:bg-white/10">
                                                <MoreHorizontal size={18} />
                                            </Button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
