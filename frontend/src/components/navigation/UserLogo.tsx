import { faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { loadImage } from '../../utils/utils';
import FormItem from '../form/FormItem';
import Modal from '../modal/Modal';
import { authHeader } from '../utils/Auth';
import ButtonWithIcon from '../utils/ButtonWithIcon';
import './UserLogo.css';
import profilePicture from '../../assets/profile_picture.png';
import { useAppContext } from '../../context/AppContext';

const UserLogo: React.FC = () => {
    const { image, setImage } = useAppContext();
    const [hovered, setHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newImage, setNewImage] = useState<File | undefined>(undefined);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await axios.get('/api/user/image', {
                    ...authHeader(),
                });

                if (res.data === 'No image found') {
                    setImage(profilePicture);
                } else {
                    setImage(res.data);
                }                
            } catch (error) {
                console.log(error);
            }
        };

        if (image === null) {
            fetchImage();
        }
    }, [image, setImage]);

    const saveImage = async () => {
        try {
            let imgData: string | undefined;

            if (newImage) {
                
                imgData = await loadImage(newImage);
    
                await axios.put('/api/user/image', {
                    image: imgData,
                },
                {
                    headers: authHeader().headers,
                });

                setImage(imgData);
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewImage(e.target.files![0]);
    };

    const updateImage = () => {
        setShowModal(true);
    };

    const onModalClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="user-img"
                style={{ backgroundImage: `${hovered ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ' : ''} url(${image})` }}
            >
                <ButtonWithIcon onClick={updateImage} className="userlogo-button-edit">
                    <FontAwesomeIcon icon={faPen} />
                </ButtonWithIcon>
            </div>
            {showModal && (
            <Modal onClose={onModalClose}>
                    <div className="userlogo-modal">
                        <h1>Change profile picture</h1>
                        <div className="userlogo-modal-content">
                            <FormItem inputType="file" title="Add profile picture" inputName="image" onChange={onChange} />
                        </div>
                        <button className="btn edit-btn-save" onClick={saveImage}>
                            <FontAwesomeIcon icon={faSave} />
                            Save image
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default UserLogo;
