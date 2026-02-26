import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Users2,
    MessageSquare,
    BarChart3,
    Search,
    Bell,
    LogOut,
    BrainCircuit,
    ShieldCheck,
    ShieldAlert,
    Shield,
    Menu,
    Sun,
    Moon
} from 'lucide-react';
import { Button, Card } from '../components/ui';
import StudentManagement from '../components/dashboard/StudentManagement';

import AdminOverview from '../components/dashboard/AdminOverview';
import TeamManagement from '../components/dashboard/TeamManagement';
import EventControl from '../components/dashboard/EventControl';
import CodingRoundControl from '../components/dashboard/CodingRoundControl';
import InterviewManager from '../components/dashboard/InterviewManager';
import ReportGenerator from '../components/dashboard/ReportGenerator';
import SecurityLogs from '../components/dashboard/SecurityLogs';
import HackathonControl from '../components/dashboard/HackathonControl';
import { useHackathon } from '../context/HackathonContextState';

const sidebarItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'students', icon: Users, label: 'User Management' },
    { id: 'teams', icon: Users2, label: 'Team Control' },
    { id: 'events', icon: BrainCircuit, label: 'Hackathons' },
    { id: 'coding', icon: ShieldCheck, label: 'Coding Rounds' },
    { id: 'interviews', icon: MessageSquare, label: 'Interviews' },
    { id: 'hackathon', icon: Shield, label: 'Platform Control' },
    { id: 'reports', icon: BarChart3, label: 'Reports & Certificates' },

    { id: 'security', icon: ShieldAlert, label: 'Security & Logs' },
];

export default function ManagementPortal() {
    const { state, logout } = useHackathon();
    const [activeTab, setActiveTab] = React.useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [theme, setTheme] = React.useState<'dark' | 'light'>(
        document.documentElement.classList.contains('light-mode') ? 'light' : 'dark'
    );

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        if (newTheme === 'light') {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 flex overflow-hidden font-inter relative selection:bg-blue-500/30">
            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 w-72 bg-black/40 backdrop-blur-2xl border-r border-white/5 flex flex-col z-50 transition-all duration-300
                lg:translate-x-0 lg:static lg:inset-auto ${isSidebarOpen ? 'translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)]' : '-translate-x-full'}
            `}>
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20">
                            CP
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter text-white">CODE ARENA</span>
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Management</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 py-4">
                    {sidebarItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setActiveTab(item.id);
                                if (window.innerWidth < 1024) setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === item.id
                                ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                                }`}
                        >
                            <item.icon size={20} className={activeTab === item.id ? 'text-blue-400' : 'group-hover:text-blue-400 transition-colors'} />
                            <span className="font-semibold text-sm">{item.label}</span>
                            {activeTab === item.id && (
                                <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-6 mt-auto border-t border-white/5">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 mb-4 group cursor-pointer hover:border-blue-500/30 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center">
                                <ShieldCheck size={18} className="text-blue-300" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-wider">System Status</p>
                                <p className="text-[10px] text-emerald-400 font-black animate-pulse">ALL SYSTEMS GO</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300">
                        <LogOut size={20} />
                        <span className="font-bold text-sm">Terminate Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent)]">
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-10 bg-black/20 backdrop-blur-xl sticky top-0 z-40">
                    <div className="flex items-center gap-6 flex-1">
                        <button onClick={toggleSidebar} className="lg:hidden p-2.5 text-slate-400 hover:text-white bg-white/5 rounded-xl border border-white/10">
                            <Menu size={20} />
                        </button>
                        <div className="relative max-w-md w-full hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search users, teams, or logs..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all focus:bg-white/10"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all hover:bg-white/10 relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#020617]" />
                            </button>
                            <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all hover:bg-white/10">
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>

                        <div className="h-10 w-px bg-white/5 mx-2" />

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Administrator</p>
                                <p className="text-sm font-bold text-white tracking-tight">{state.user?.name || 'Operator 01'}</p>
                            </div>
                            <div className="relative">
                                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] shadow-lg shadow-blue-500/20">
                                    <div className="h-full w-full rounded-2xl bg-[#020617] flex items-center justify-center overflow-hidden">
                                        <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center font-black text-white text-xs">
                                            {state.user?.name?.charAt(0) || 'A'}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-[#020617]" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <AdminOverview />
                        )}

                        {activeTab === 'students' && (
                            <motion.div key="students" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                                <StudentManagement />
                            </motion.div>
                        )}

                        {activeTab === 'teams' && (
                            <TeamManagement />
                        )}

                        {activeTab === 'events' && (
                            <EventControl />
                        )}

                        {activeTab === 'coding' && (
                            <CodingRoundControl />
                        )}

                        {activeTab === 'interviews' && (
                            <InterviewManager />
                        )}

                        {activeTab === 'hackathon' && (
                            <HackathonControl />
                        )}
                        {activeTab === 'reports' && (

                            <ReportGenerator />
                        )}

                        {activeTab === 'security' && (
                            <SecurityLogs />
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
