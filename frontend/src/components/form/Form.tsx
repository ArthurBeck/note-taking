import React from 'react';
import './Form.css';

export interface Props {
    title: string;
    buttonText: string;
    onSubmit: React.FormEventHandler<HTMLFormElement>; 
}

const Form: React.FC<Props> = ({title, buttonText, onSubmit, children}) => (
    <div className="form-container">
        <form className="form" onSubmit={onSubmit}>
            <h3 className="form-title">{title}</h3>
            {children}
            <button className="btn btn-form-submit" type="submit">{buttonText}</button>
        </form>
    </div>
);

export default Form;
