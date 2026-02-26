import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, User, Star, Clock, Video, Filter } from 'lucide-react';
import { Card, Button } from '../ui';

const mockInterviews = [
    { id: 'I01', candidate: 'Sourabh Sahu', judge: 'Dr. Amitabh', time: '10:30 AM', status: 'Scheduled', type: 'Technical' },
    { id: 'I02', candidate: 'Priya Sharma', judge: 'Prof. Mehra', time: '11:45 AM', status: 'In Progress', type: 'Design' },
    { id: 'I03', candidate: 'Rahul Verma', judge: 'TBD', time: '02:00 PM', status: 'Unassigned', type: 'Product' },
];

export default function InterviewManager() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <p className="text-purple-400 font-bold text-xs uppercase tracking-[0.3em] mb-2">Evaluation Protocol</p>
                    <h2 className="text-4xl font-black text-white tracking-tighter">Interview Streams</h2>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 rounded-2xl px-8 py-3 font-black text-sm">
                    SCHEDULE NEW SESSION
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-white/5 border-white/5 overflow-hidden backdrop-blur-xl rounded-[2.5rem]">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <Calendar className="text-purple-400" size={22} />
                            Daily Schedule
                        </h3>
                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white">
                            View Full Calendar
                        </Button>
                    </div>
                    <div className="p-8 space-y-6">
                        {mockInterviews.map((session, i) => (
                            <motion.div
                                key={session.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:border-purple-500/30 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex justify-between items-center relative z-10">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-white/10 flex items-center justify-center font-black text-purple-400 text-xl">
                                            {session.candidate.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-purple-400 transition-colors">{session.candidate}</div>
                                            <div className="flex items-center gap-4 mt-1">
                                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                                                    <Clock size={12} /> {session.time}
                                                </span>
                                                <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">{session.type} DEPTH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border mb-2 inline-block ${session.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                session.status === 'In Progress' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-400/20' :
                                                    'bg-white/5 text-slate-500 border-white/10'
                                            }`}>
                                            {session.status}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold justify-end">
                                            <User size={12} /> {session.judge}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>

                <Card className="p-8 bg-white/5 border-white/5 rounded-[2.5rem] flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                        <Star className="text-yellow-400" size={22} />
                        Judge Roster
                    </h3>
                    <div className="space-y-6 flex-1">
                        {[
                            { name: 'Dr. Amitabh', role: 'Chief Scientist', load: '80%' },
                            { name: 'Prof. Mehra', role: 'Head of Engineering', load: '45%' },
                            { name: 'Ankita Singh', role: 'Senior Architect', load: '90%' },
                        ].map((judge, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-yellow-400/30 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center font-black text-yellow-500">
                                        {judge.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">{judge.name}</p>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{judge.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-500 font-black mb-1.5 uppercase">Load</p>
                                    <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400" style={{ width: judge.load }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="w-full mt-10 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-4 font-black text-[10px] uppercase tracking-[0.2em]">
                        ASSIGN EVALUATORS
                    </Button>
                </Card>
            </div>
        </div>
    );
}
