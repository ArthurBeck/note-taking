import axios from 'axios';
import React, { useRef, useState } from 'react';

import 'react-quill/dist/quill.snow.css';
import { RouteComponentProps, withRouter } from 'react-router';
import { authHeader } from '../components/utils/Auth';
import FormItem from '../components/form/FormItem';
import Page from '../components/layout/Page';
import { useAppContext } from '../context/AppContext';
import { NoteWithContent } from '../interfaces';
import NoteCard from '../components/note/NoteCard';
import './Edit.css';
import { loadImage } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSave, faTrash, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { diff } from 'deep-diff';
import EditTextBox from '../components/edit/EditTextBox';
import EditSaveModal from '../components/edit/EditSaveModal';

type ButtonAction = 'SAVE' | 'BACK';

const Edit: React.FC<RouteComponentProps> = ({ history }) => {
    const { setCurrentNote, currentNote, notes, setNotes, clearContext } = useAppContext();

    const getNoteState = (note: NoteWithContent | null) => {
        return {
            title: note?.title || '',
            content: note?.content || '',
            image: note?.image,
        };
    };

    const [noteState, setNoteState] = useState(getNoteState(currentNote));
    const [activeBtn, setActiveBtn] = useState<ButtonAction | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const imageRef = useRef<HTMLInputElement | null>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (activeBtn === 'SAVE') {
            save();
        } else if (diff(getNoteState(currentNote), noteState) !== undefined) {
            setShowPopup(true);
        } else {
            back();
        }
    };

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === 'file') {
            const imageFile = e.target.files![0];
            const imageData = await loadImage(imageFile);

            setNoteState({
                ...noteState,
                image: imageData,
            });
        } else {
            setNoteState({
                ...noteState,
                title: e.target.value,
            });
        }
    };

    const save = async () => {
        try {
            const method = currentNote === null ? axios.post : axios.put;
            const res = await method(`/api/notes${currentNote === null ? '' : '/' + currentNote._id.$oid}`, noteState, {
                headers: authHeader().headers,
            });

            const noteData = res.data as NoteWithContent;

            const prevNote = notes.find((note) => note._id.$oid === noteData._id.$oid);

            if (prevNote) {
                setNotes([noteData, ...notes.filter((note) => note._id.$oid !== noteData._id.$oid)]);
            } else {
                setNotes([noteData, ...notes]);
            }

            setCurrentNote(noteData);
            setNoteState(getNoteState(noteData));

            clearImage();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }
        }
    };

    const back = () => {
        setCurrentNote(null);
        history.goBack();
    };

    const clearImage = () => {
        if (noteState.image) {
            if (imageRef.current !== null) {
                // @ts-ignore
                imageRef.current.value = null;
            }
        }
    };

    const a = () => {
        clearImage();
        setNoteState({
            ...noteState,
            image: currentNote?.image,
        });
    };

    const deleteImage = async () => {
        try {
            if (currentNote) {
                await axios.put(`/api/notes/${currentNote._id.$oid}/delete-image`, {}, { headers: authHeader().headers });

                setCurrentNote({
                    ...currentNote,
                    image: undefined,
                });

                setNoteState({
                    ...noteState,
                    image: undefined,
                });
            }
        } catch (error) {}
    };

    const setContent = (content: string) => {
        setNoteState({
            ...noteState,
            content,
        });
    };

    return (
        <Page navigationUrls={[{ url: '/login', text: 'Log out', onClick: clearContext }]}>
            <form onSubmit={onSubmit}>
                <div className="edit-note-container">
                    <div className="edit-note-detail-container">
                        <div className="edit-note-detail-container-left">
                            <div className="edit-button-container">
                                <button type="submit" className="btn" onClick={() => setActiveBtn('BACK')}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    Back
                                </button>
                                <button type="submit" className="btn edit-btn-save" onClick={() => setActiveBtn('SAVE')}>
                                    <FontAwesomeIcon icon={faSave} />
                                    Save
                                </button>
                            </div>
                            
                            <div className="note-picture-container">
                                <FormItem ref={imageRef} inputType="file" title="Add note picture" inputName="image" onChange={onChange} />
                                {noteState.image && noteState.image !== currentNote?.image && (
                                    <button type="button" className="btn" onClick={a}>
                                        <FontAwesomeIcon icon={faWindowClose} />
                                        Clear new picture
                                    </button>
                                )}
                                {currentNote !== null && currentNote.image && (
                                    <button type="button" className="btn edit-btn-delete" onClick={deleteImage}>
                                        <FontAwesomeIcon icon={faTrash} />
                                        Delete picture
                                    </button>
                                )}
                            </div>

                            <FormItem inputType="text" title="Title" inputValue={noteState.title} inputName="title" onChange={onChange} />
                        </div>
                        
                        <div className="edit-note-detail-container-right">
                            <NoteCard note={{ ...noteState, lastModified: { $date: Date.now() } }}>
                                <div className="edit-note-preview-placeholder"></div>
                            </NoteCard>
                        </div>
                    </div>

                    <EditTextBox content={noteState.content} setContent={setContent} />
                </div>
            </form>
            {showPopup && <EditSaveModal save={save} back={back} />}
        </Page>
    );
};

export default withRouter(Edit);

// TODO:

// - Make auth pages and dashboard nicer
// - Put in alerts
