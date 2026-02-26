import { createContext, useContext } from 'react';

export type HackathonStatus = 'upcoming' | 'registering' | 'live' | 'judging' | 'ended';

export interface HackathonState {
    status: HackathonStatus;
    userRole: 'user' | 'operator' | 'guest';
    isRegistered: boolean;
    currentTrack: string | null;
    user: any | null;
    updates: any[];
    problems: any[];
    submissions: any[];
    stats: {
        participants: number;
        serverLoad: number;
        activeSubmissions: number;
    };
    settings: {
        phase: HackathonStatus;
        activeTrack: string;
        countdownEndDate: string;
    } | null;
}

export interface HackathonContextType {
    state: HackathonState;
    setStatus: (status: HackathonStatus) => void;
    register: (track: string) => void;
    login: (user: any, token: string) => void;
    logout: () => void;
    submitCode: (code: string, language: string, problemId?: string) => Promise<any>;
    updateSettings: (settings: any) => Promise<void>;
    toggleUserVerification: (userId: string) => Promise<void>;
}


export const HackathonContext = createContext<HackathonContextType | undefined>(undefined);

export const useHackathon = () => {
    const context = useContext(HackathonContext);
    if (!context) {
        throw new Error('useHackathon must be used within a HackathonProvider');
    }
    return context;
};
