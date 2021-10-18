import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import AlertsContainer from '../components/alerts/AlertsContainer';
import Form from '../components/form/Form';
import FormItem from '../components/form/FormItem';
import Page, { NavigationUrls } from '../components/layout/Page';
import { useAppContext } from '../context/AppContext';
import { loadImage } from '../utils/utils';
import './AuthPage.css';

export interface Props {
    navigationUrls: NavigationUrls;
    name: string;
    askForImage?: boolean;
    apiURL: string;
    nextPage: string;
    onSuccess?: (data: string) => void;
}

interface FormInput {
    username: string;
    password: string;
    image?: File;
}

const AuthPage: React.FC<Props & RouteComponentProps> = ({ navigationUrls, name, askForImage, apiURL, nextPage, onSuccess, history }) => {
    const { addAlert } = useAppContext();
    
    const [formState, setFormState] = useState<FormInput>({
        username: '',
        password: '',
        image: undefined,
    });

    useEffect(() => {
        setFormState({
            username: '',
            password: '',
            image: undefined
        });
    }, [name]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password, image } = formState;
       
        try {
            let imgData: string | undefined;

            if (image) {
                imgData = await loadImage(image);
            }
            
            const res = await axios.post<string>(apiURL, {
                username,
                password,
                image: imgData
            });

            if (onSuccess) {
                onSuccess(res.data)
            }

            history.push(nextPage);
        } catch (error) {
            if (axios.isAxiosError(error))  {
                addAlert(error.response?.data);
            }
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.type === 'file' ? e.target.files![0] : e.target.value
        });
    };
    
    return (
        <>
            <Page navigationUrls={navigationUrls}>
                <AlertsContainer />
                <div className="auth-page-container">
                    <Form title={name} buttonText={name} onSubmit={onSubmit}>
                        <FormItem
                            inputType="text"
                            title="Username"
                            inputValue={formState.username}
                            inputName="username"
                            onChange={onChange}
                            isRequired
                        />
                        <FormItem
                            inputType="password"
                            title="Password"
                            inputValue={formState.password}
                            inputName="password"
                            onChange={onChange}
                            isRequired
                        />
                        {askForImage && (
                            <FormItem
                                inputType="file"
                                title="Add profile picture"
                                inputName="image"
                                onChange={onChange}
                            />
                        )}
                    </Form>
                </div>
            </Page>
        </>
    );
};

export default withRouter(AuthPage);
