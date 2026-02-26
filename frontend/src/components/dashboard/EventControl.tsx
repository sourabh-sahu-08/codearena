import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Plus, Calendar, Clock, Rocket, Edit, Trash2, Globe } from 'lucide-react';
import { Card, Button } from '../ui';

const mockEvents = [
    { id: 'EV01', name: 'Bharat Tech Odyssey', status: 'Active', rounds: 3, deadline: '2026-03-15', participation: 1240 },
    { id: 'EV02', name: 'Green Innovation Challenge', status: 'Draft', rounds: 2, deadline: '2026-04-20', participation: 0 },
];

export default function EventControl() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <p className="text-blue-400 font-bold text-xs uppercase tracking-[0.3em] mb-2">Architectural Control</p>
                    <h2 className="text-4xl font-black text-white tracking-tighter">Hackathons & Events</h2>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 rounded-2xl px-8 py-3 font-black text-sm flex items-center gap-3">
                    <Plus size={20} />
                    INITIALIZE NEW EVENT
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockEvents.map((event, i) => (
                    <Card key={event.id} className="bg-white/5 border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${event.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]' : 'bg-white/5 text-slate-500 border-white/10'
                                }`}>
                                {event.status}
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                                    <Edit size={18} />
                                </button>
                                <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-3xl font-black text-white tracking-tighter mb-6 group-hover:text-blue-400 transition-colors uppercase leading-none">
                            {event.name}
                        </h3>

                        <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400">
                                    <Rocket size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-0.5">Structure</p>
                                    <p className="text-sm font-bold text-white tracking-tight">{event.rounds} PHASE MODE</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-0.5">Deadline</p>
                                    <p className="text-sm font-bold text-white tracking-tight">{event.deadline}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-2">
                                <Globe size={14} className="text-slate-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.participation.toLocaleString()} COMMITS</span>
                            </div>
                            <Button variant="ghost" className="text-blue-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group/btn hover:bg-blue-500/10">
                                MANAGE ARCHITECTURE
                                <Clock size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
