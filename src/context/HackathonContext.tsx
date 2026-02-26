import React, { useState, useEffect } from 'react';
import { HackathonContext } from './HackathonContextState';
import type { HackathonState, HackathonStatus } from './HackathonContextState';

export const HackathonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<HackathonState>({
        status: 'registering',
        userRole: 'guest',
        isRegistered: false,
        currentTrack: null,
        stats: {
            participants: 12450,
            serverLoad: 42,
            activeSubmissions: 890,
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setState(prev => ({
                ...prev,
                stats: {
                    participants: prev.stats.participants + Math.floor(Math.random() * 3),
                    serverLoad: Math.min(95, Math.max(10, prev.stats.serverLoad + (Math.random() * 10 - 5))),
                    activeSubmissions: prev.stats.activeSubmissions + Math.floor(Math.random() * 5),
                }
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const setStatus = (status: HackathonStatus) => {
        setState(prev => ({ ...prev, status }));
    };

    const register = (track: string) => {
        setState(prev => ({ ...prev, isRegistered: true, currentTrack: track, userRole: 'participant' }));
    };

    return (
        <HackathonContext.Provider value={{ state, setStatus, register }}>
            {children}
        </HackathonContext.Provider>
    );
};

