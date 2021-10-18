import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Modal from '../modal/Modal';

export interface Props {
    save: () => Promise<void>;
    back: () => void;
}

const EditSaveModal: React.FC<Props> = ({ save, back }) => {
    const saveAndBack = async () => {
        await save();

        back();
    };

    return (
        <Modal onClose={back}>
            <div className="edit-popup">
                <h3>Do you want to save?</h3>
                <div className="edit-popup-button-container">
                    <button type="submit" className="btn edit-btn-delete" onClick={back}>
                        <FontAwesomeIcon icon={faTrash} />
                        Don't save
                    </button>
                    <button type="submit" className="btn edit-btn-save" onClick={saveAndBack}>
                        <FontAwesomeIcon icon={faSave} />
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EditSaveModal;
