import React, { useState } from 'react';
import { deleteToken } from '../components/utils/Auth';
import { Note, NoteWithContent } from '../interfaces';
import { AppContext } from './AppContext';

const AppState: React.FC = ({ children }) => {

    const [notes, setNotes] = useState<Note[]>([]);
    const [currentNote, setCurrentNote] = useState<NoteWithContent | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);
    const [alerts, setAlerts] = useState<string[]>([]);

    const clearContext = () => {
        setNotes([]);
        setCurrentNote(null);
        setAuthenticated(false);
        setImage(null);
        setAlerts([]);

        deleteToken();
    };

    const addAlert = (newAlert: string) => {
        setAlerts([...alerts.filter(alert => alert !== newAlert), newAlert]);

        setTimeout(() => {
            setAlerts(alerts.filter(alert => alert !== newAlert));
        }, 3000);
    };

    const clearAlerts = () => {
        setAlerts([]);
    };

    return (
        <AppContext.Provider value={{
            notes,
            setNotes,
            currentNote,
            setCurrentNote,
            authenticated,
            setAuthenticated,
            image,
            setImage,
            alerts,
            addAlert,
            clearAlerts,

            clearContext,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppState;
