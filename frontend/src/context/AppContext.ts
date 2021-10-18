import { createContext, useContext } from 'react';
import { Note, NoteWithContent } from '../interfaces';

export interface ContextInterface {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    currentNote: NoteWithContent | null;
    setCurrentNote: React.Dispatch<React.SetStateAction<NoteWithContent | null>>;
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    image: string | null;
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
    alerts: string[];
    addAlert: (newAlert: string) => void;
    clearAlerts: () => void;

    clearContext: () => void;
};

export const AppContext = createContext<ContextInterface>({
    notes: [],
    setNotes: () => {},
    currentNote: null,
    setCurrentNote: () => {},
    authenticated: false,
    setAuthenticated: () => {},
    image: null,
    setImage: () => {},
    alerts: [],
    addAlert: () => {},
    clearAlerts: () => {},

    clearContext: () => {},
});

export const useAppContext = () => useContext(AppContext);
