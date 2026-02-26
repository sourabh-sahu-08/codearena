import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserCheck, UserX, Mail, Shield, Filter, MoreHorizontal, ShieldCheck } from 'lucide-react';
import { Card, Button } from '../ui';
import { useHackathon } from '../../context/HackathonContextState';




export default function StudentManagement() {
    const { toggleUserVerification } = useHackathon();
    const [users, setUsers] = React.useState<any[]>([]);

    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('codearena_token')}`
                }
            });
            const data = await response.json();
            if (Array.isArray(data)) setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const handleStatusToggle = async (userId: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('codearena_token')}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                setUsers(users.map(u => u._id === userId ? { ...u, status: newStatus } : u));
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('codearena_token')}`
                }
            });
            if (response.ok) {
                setUsers(users.filter(u => u._id !== userId));
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.college?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <p className="text-blue-400 font-bold text-xs uppercase tracking-[0.3em] mb-2">Participant Directory</p>
                    <h2 className="text-4xl font-black text-white tracking-tighter">User Management</h2>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Find by name, email or college..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all focus:bg-white/10 text-white placeholder:text-slate-600"
                        />
                    </div>
                    <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl p-3">
                        <Filter size={20} />
                    </Button>
                </div>
            </div>

            <Card className="bg-white/5 border-white/5 overflow-hidden backdrop-blur-xl rounded-[2rem]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/5">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Student Identity</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Institution & Domain</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Account Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Score</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Scanning Network...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-slate-500 italic">
                                        No matching participants found in the encrypted logs.
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((student, i) => (
                                    <motion.tr
                                        key={student._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-white/[0.02] transition-all group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-white/5 flex items-center justify-center font-black text-blue-400 group-hover:scale-110 transition-transform">
                                                    {student.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{student.name}</div>
                                                    <div className="text-[10px] text-slate-500 font-mono">{student.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-bold text-slate-300">{student.college || 'National University'}</div>
                                            <div className="text-[10px] text-purple-400 font-black uppercase tracking-widest mt-1">{student.track || 'Unassigned'}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${student.status === 'Active'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]'
                                                : 'bg-red-500/10 text-red-400 border-red-400/20'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${student.status === 'Active' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-red-400'}`} />
                                                {student.status || 'Active'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className="font-mono font-black text-xl text-white group-hover:text-blue-400 transition-colors tracking-tighter">{student.score || 0}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={`p-2.5 rounded-xl border border-white/5 hover:bg-blue-500/10 transition-all ${student.isVerified ? 'text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'text-slate-500'}`}
                                                    onClick={async () => {
                                                        await toggleUserVerification(student._id);
                                                        fetchUsers(); // Refresh to show status
                                                    }}
                                                    title={student.isVerified ? 'Unverify' : 'Verify Student'}
                                                >
                                                    <ShieldCheck size={18} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={`p-2.5 rounded-xl border border-white/5 hover:bg-white/10 transition-all ${student.status === 'Active' ? 'text-slate-500' : 'text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]'}`}
                                                    onClick={() => handleStatusToggle(student._id, student.status || 'Active')}
                                                    title={student.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                >
                                                    <UserCheck size={18} />
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-2.5 rounded-xl border border-white/5 hover:bg-red-500/10 hover:text-red-400 transition-all"
                                                    onClick={() => handleDelete(student._id)}
                                                    title="Delete Participant"
                                                >
                                                    <UserX size={18} />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="p-2.5 rounded-xl border border-white/5 hover:bg-white/10 text-slate-500 hover:text-white">
                                                    <MoreHorizontal size={18} />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
