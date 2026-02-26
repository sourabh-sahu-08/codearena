import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Fingerprint, Lock, ShieldCheck, Cpu, Terminal, History, AlertTriangle } from 'lucide-react';
import { Card, Button } from '../ui';

export default function SecurityLogs() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <p className="text-red-500 font-bold text-xs uppercase tracking-[0.3em] mb-2">Threat Mitigation</p>
                    <h2 className="text-4xl font-black text-white tracking-tighter">Security & Infrastructure</h2>
                </div>
                <div className="flex gap-3">
                    <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-8 py-3 font-black text-[10px] uppercase tracking-widest">
                        System Audit
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 rounded-xl px-8 py-3 font-black text-[10px] uppercase tracking-widest">
                        Active Shield: ON
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <Card className="lg:col-span-1 p-8 bg-white/5 border-white/5 rounded-[2.5rem] space-y-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
                            <ShieldCheck className="text-emerald-400" size={24} />
                            <div>
                                <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Encryption</p>
                                <p className="text-sm font-bold text-white tracking-tight">AES-256 ACTIVE</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-3xl">
                            <Cpu className="text-blue-400" size={24} />
                            <div>
                                <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest">CPU Integrity</p>
                                <p className="text-sm font-bold text-white tracking-tight">99.98% STABLE</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-red-500/5 border border-red-500/20 rounded-3xl">
                            <ShieldAlert className="text-red-400" size={24} />
                            <div>
                                <p className="text-[10px] font-black uppercase text-red-400 tracking-widest">Anomalies</p>
                                <p className="text-sm font-bold text-white tracking-tight">00 DETECTED</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Access Control</h4>
                        <div className="space-y-4">
                            {['Operator 01', 'Admin Root', 'Judge #04'].map(u => (
                                <div key={u} className="flex items-center justify-between text-xs">
                                    <span className="text-slate-400 font-bold">{u}</span>
                                    <span className="text-emerald-400 font-black">AUTHORIZED</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                <Card className="lg:col-span-3 bg-white/5 border-white/5 overflow-hidden backdrop-blur-xl rounded-[2.5rem] flex flex-col">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Terminal size={22} className="text-red-400" />
                            <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Event Logs: Realtime</h3>
                        </div>
                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            Clear Console
                        </Button>
                    </div>
                    <div className="bg-black/40 p-10 flex-1 font-mono text-xs overflow-y-auto max-h-[500px] leading-relaxed">
                        <p className="text-emerald-400 mb-2">[SYS_BOOT] Secure environment initialized. Handshake complete.</p>
                        <p className="text-slate-500 mb-2">[AUTH_EV] Operator 01 session established via JWT-RS256.</p>
                        <p className="text-slate-500 mb-2">[DB_SY] Database cluster sync established @ Bharat-West-1.</p>
                        <p className="text-blue-400 mb-2">[TR_MON] Traffic monitor detecting 1,240 concurrent connections.</p>
                        <p className="text-slate-500 mb-2">[SEC_SCAN] Weekly vulnerability scan initiated. Status: 12%</p>
                        <p className="text-orange-400 mb-4 flex items-center gap-2">
                            <AlertTriangle size={14} /> [ALERT] Unusual login pattern detected from IP 192.168.1.45. Mitigation engaged.
                        </p>
                        <p className="text-slate-500 mb-2">[SYS_ST] Automatic backup scheduled @ 00:00 UTC.</p>
                        <p className="text-emerald-400 mb-2 animate-pulse mt-4">_ Awaiting next system event...</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
