import React from 'react';
import { PreviewNote } from '../../interfaces';
import './NoteListItem.css';

export interface Props {
    note: PreviewNote;
}

const NoteListItem: React.FC<Props> = ({ note, children }) => (
    <div className="note-list-item">
        <h3 className="note-list-item-title">{note.title}</h3>

        <div>
            {children}
        </div>
    </div>
);

export default NoteListItem;
