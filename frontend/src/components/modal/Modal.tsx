import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import './Modal.css';

export interface Props {
    onClose: () => void;
}

const Modal: React.FC<Props> = ({ onClose, children }) => {
    const overlayRef = useRef(null);

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    return (
        <div className="modal-container" onClick={onClick} ref={overlayRef}>
            <div className="modal-content">
                <button className="modal-close" type="button" onClick={onClose}><FontAwesomeIcon icon={faWindowClose} /></button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
