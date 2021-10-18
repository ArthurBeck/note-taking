import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import { Note } from '../../interfaces';
import { authHeader } from '../utils/Auth';
import ButtonWithIcon from '../utils/ButtonWithIcon';

export interface Props {
    note: Note;
}

const NoteCardButton: React.FC<Props & RouteComponentProps> = ({ note, history }) => {
    const { setNotes, setCurrentNote } = useAppContext();

    const updateNote = async () => {
        try {
            const res = await axios.get(`/api/notes/${note._id.$oid}`, {
                ...authHeader()
            });

            setCurrentNote(res.data);

            history.push('/edit');
        } catch (error) {
            console.log(error);
        }
    };

    const deleteNote = async () => {
        try {
            const res = await axios.delete(`/api/notes/${note._id.$oid}`, {
                ...authHeader()
            });

            setNotes(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="notecard-button-container">
            <ButtonWithIcon onClick={updateNote} className="notecard-button-edit"><FontAwesomeIcon icon={faPen} /></ButtonWithIcon>
            <ButtonWithIcon onClick={deleteNote} className="notecard-button-delete"><FontAwesomeIcon icon={faTrash} /></ButtonWithIcon>
        </div>
    );
};

export default withRouter(NoteCardButton);
