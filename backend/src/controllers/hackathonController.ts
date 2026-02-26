import type { Request, Response } from 'express';
import HackathonSettings from '../models/HackathonSettings.js';

export const getHackathonSettings = async (req: Request, res: Response) => {
    try {
        let settings = await HackathonSettings.findOne();
        if (!settings) {
            settings = new HackathonSettings();
            await settings.save();
        }
        res.status(200).json(settings);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateHackathonSettings = async (req: Request, res: Response) => {
    try {
        const { phase, activeTrack, countdownEndDate } = req.body;
        let settings = await HackathonSettings.findOne();

        if (!settings) {
            settings = new HackathonSettings({ phase, activeTrack, countdownEndDate });
        } else {
            if (phase) settings.phase = phase;
            if (activeTrack) settings.activeTrack = activeTrack;
            if (countdownEndDate) settings.countdownEndDate = countdownEndDate;
        }

        await settings.save();
        res.status(200).json(settings);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
