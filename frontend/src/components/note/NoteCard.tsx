import React from 'react';
import './NoteCard.css';
import noteImage from '../../assets/note_image.jpg';
import { PreviewNote } from '../../interfaces';

export interface Props {
    note: PreviewNote;
}

const calculateLastModified = (lastModified: number): string => {
    const now = Date.now();

    const diff = now - lastModified;
    // ms -> seconds -> minutes -> hours -> days
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return days === 0 ? 'today' : `${days} days ago`;
}

const NoteCard: React.FC<Props> = ({ note, children }) => (
    <div className="notecard" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${note.image ?? noteImage})`}}>
        <div className="">
            <h3 className="notecard-title">{note.title}</h3>
            <p className="notecard-date">Last edited: {calculateLastModified(note.lastModified.$date)}</p>
        </div>

        {children}
    </div>
);

export default NoteCard;
