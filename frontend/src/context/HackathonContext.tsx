import React, { useState, useEffect } from 'react';
import { HackathonContext } from './HackathonContextState';
import type { HackathonState, HackathonStatus } from './HackathonContextState';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const HackathonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<HackathonState>(() => {
        const savedUser = localStorage.getItem('codearena_user');
        const user = savedUser ? JSON.parse(savedUser) : null;
        return {
            status: 'registering',
            userRole: user ? (user.role === 'operator' ? 'operator' : 'user') : 'guest',
            isRegistered: !!user,
            currentTrack: null,
            user,
            updates: [],
            problems: [],
            submissions: [],
            stats: {
                participants: 12450,
                serverLoad: 42,
                activeSubmissions: 890,
            },
            settings: null
        };
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('codearena_token');
            if (!token) return;

            const headers = { 'Authorization': `Bearer ${token}` };

            try {
                // Fetch Settings
                const settingsRes = await fetch(`${API_URL}/api/hackathon/settings`, { headers });
                if (settingsRes.ok) {
                    const settingsData = await settingsRes.json();
                    setState(prev => ({
                        ...prev,
                        settings: settingsData,
                        status: settingsData.phase.toLowerCase() as HackathonStatus
                    }));
                }

                // Fetch Stats
                const statsRes = await fetch(`${API_URL}/api/stats`, { headers });
                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setState(prev => ({ ...prev, stats: statsData }));
                }

                // Fetch Updates
                const updatesRes = await fetch(`${API_URL}/api/updates`, { headers });
                if (updatesRes.ok) {
                    const updatesData = await updatesRes.json();
                    setState(prev => ({ ...prev, updates: updatesData }));
                }

                // Fetch Problems
                const problemsRes = await fetch(`${API_URL}/api/problems`, { headers });
                if (problemsRes.ok) {
                    const problemsData = await problemsRes.json();
                    setState(prev => ({ ...prev, problems: problemsData }));
                }

                // Fetch History
                const subsRes = await fetch(`${API_URL}/api/submissions/history`, { headers });
                if (subsRes.ok) {
                    const subsData = await subsRes.json();
                    setState(prev => ({ ...prev, submissions: subsData }));
                }
            } catch (error) {
                console.error('Failed to fetch real-time data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // 10s for better interactivity
        return () => clearInterval(interval);
    }, [state.user]);

    const submitCode = async (code: string, language: string, problemId?: string) => {
        const token = localStorage.getItem('codearena_token');
        if (!token) throw new Error('Not authenticated');

        const response = await fetch(`${API_URL}/api/submissions/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ code, language, problemId })
        });

        if (!response.ok) throw new Error('Submission failed');
        return await response.json();
    };

    const updateSettings = async (settings: any) => {
        const token = localStorage.getItem('codearena_token');
        const response = await fetch(`${API_URL}/api/hackathon/settings`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(settings)
        });
        if (response.ok) {
            const data = await response.json();
            setState(prev => ({ ...prev, settings: data, status: data.phase.toLowerCase() as HackathonStatus }));
        }
    };

    const toggleUserVerification = async (userId: string) => {
        const token = localStorage.getItem('codearena_token');
        const response = await fetch(`${API_URL}/api/users/${userId}/verify`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            const updatedUser = await response.json();
            // If the updated user is the current user, update the state
            if (state.user && state.user.id === userId) {
                const newUser = { ...state.user, isVerified: updatedUser.isVerified };
                localStorage.setItem('codearena_user', JSON.stringify(newUser));
                setState(prev => ({ ...prev, user: newUser }));
            }
        }
    };

    const setStatus = (status: HackathonStatus) => {
        setState(prev => ({ ...prev, status }));
    };

    const register = (track: string) => {
        setState(prev => ({ ...prev, isRegistered: true, currentTrack: track }));
    };

    const login = (user: any, token: string) => {
        localStorage.setItem('codearena_token', token);
        localStorage.setItem('codearena_user', JSON.stringify(user));
        setState(prev => ({
            ...prev,
            user,
            userRole: user.role === 'operator' ? 'operator' : 'user',
            isRegistered: true,
        }));
    };

    const logout = () => {
        localStorage.removeItem('codearena_token');
        localStorage.removeItem('codearena_user');
        setState(prev => ({
            ...prev,
            user: null,
            userRole: 'guest',
            isRegistered: false,
        }));
    };

    return (
        <HackathonContext.Provider value={{ state, setStatus, register, login, logout, submitCode, updateSettings, toggleUserVerification }}>

            {children}
        </HackathonContext.Provider>
    );
};

