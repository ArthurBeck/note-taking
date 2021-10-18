import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { authHeader } from '../components/utils/Auth';
import Page from '../components/layout/Page';
import NoteCard from '../components/note/NoteCard';
import Spinner from '../components/utils/Spinner';
import './Dashboard.css';
import NoteCardButton from '../components/note/NoteCardButton';
import { useAppContext } from '../context/AppContext';
import NoteListItem from '../components/note/NoteListItem';

const Dashboard: React.FC<RouteComponentProps> = ({ history }) => {
    const [loading, setLoading] = useState(true);
    const { notes, setNotes, currentNote, clearContext } = useAppContext();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get('/api/notes', {
                    ...authHeader(),
                });

                setNotes(res.data);
            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        };

        fetchNotes();
    }, [setNotes]);

    const newNote = () => {
        console.log(currentNote);
        history.push('/edit');
    };

    return (
        <Page navigationUrls={[{ url: '/login', text: 'Log out', onClick: clearContext }]}>
            <div className="dashboard-content-container">
                <div className="dashboard-notes-sidebar-container">
                    <div className="dashboard-new-note-btn-container">
                        <button className="btn" onClick={newNote}>New note</button>
                    </div>
                    {!loading && notes.length > 0 && (
                        notes.map((note) => (
                            <NoteListItem note={note} key={note._id.$oid}>
                                <NoteCardButton note={note} />
                            </NoteListItem>
                        ))
                    )}
                </div>

                <div className="dashboard-notes-main-container">
                    {loading ? (
                        <Spinner />
                    ) : notes.length > 0 ? (
                        notes.map((note) => (
                            <NoteCard note={note} key={note._id.$oid}>
                                <NoteCardButton note={note} />
                            </NoteCard>
                        ))
                    ) : (
                        <p>No notes</p>
                    )}
                </div>
            </div>
        </Page>
    );
};

export default withRouter(Dashboard);
