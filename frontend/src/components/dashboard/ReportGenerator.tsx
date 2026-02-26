import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Award, FileSearch, Filter, Send, Trash2 } from 'lucide-react';
import { Card, Button } from '../ui';

const mockReports = [
    { name: 'Final Participation List', date: '2026-02-25', size: '2.4 MB', type: 'PDF' },
    { name: 'Technical Round 1 Analytics', date: '2026-02-20', size: '1.8 MB', type: 'CSV' },
    { name: 'System Performance Audit', date: '2026-02-15', size: '150 KB', type: 'DOCX' },
];

export default function ReportGenerator() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <p className="text-orange-400 font-bold text-xs uppercase tracking-[0.3em] mb-2">Knowledge management</p>
                    <h2 className="text-4xl font-black text-white tracking-tighter">Reports & Certificates</h2>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-8 py-3 font-black text-sm flex items-center gap-3">
                        <Award size={20} className="text-yellow-400" />
                        CERTIFICATE STUDIO
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <Card className="lg:col-span-1 p-8 bg-white/5 border-white/5 rounded-[2.5rem] space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 font-black tracking-tighter uppercase">
                            <FileSearch className="text-blue-400" size={20} />
                            Quick Build
                        </h3>
                        <div className="space-y-4">
                            <Button className="w-full justify-start text-left bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 py-4 px-6 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-3">
                                <Download size={18} />
                                Export Participant CSV
                            </Button>
                            <Button className="w-full justify-start text-left bg-purple-600/10 hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-500/20 py-4 px-6 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-3">
                                <FileText size={18} />
                                Generate Final Report
                            </Button>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">Storage Usage</p>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600" style={{ width: '45%' }} />
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold tracking-tight text-right">4.2 GB / 10 GB SECURE CLOUD</p>
                    </div>
                </Card>

                <Card className="lg:col-span-3 bg-white/5 border-white/5 overflow-hidden backdrop-blur-xl rounded-[2.5rem]">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">Generated Manifests</h3>
                        <Button variant="ghost" className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-500 hover:text-white">
                            <Filter size={20} />
                        </Button>
                    </div>
                    <div className="p-8 space-y-4">
                        {mockReports.map((report, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-blue-500/30 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400">
                                        <FileText size={22} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{report.name}</p>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1 flex items-center gap-2">
                                            {report.date} <span className="w-1 h-1 rounded-full bg-white/10" /> {report.size} <span className="w-1 h-1 rounded-full bg-white/10" /> {report.type}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                                        <Download size={20} />
                                    </button>
                                    <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                                        <Send size={20} />
                                    </button>
                                    <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
