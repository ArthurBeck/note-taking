import React from 'react';
import './FormItem.css';

export interface Props {
    inputType: 'text' | 'password' | 'file';
    inputName: string;
    inputValue?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    title: string;
    isRequired?: boolean;
}

const FormItem = React.forwardRef<HTMLInputElement, Props>(({ inputType, inputName, inputValue, onChange, title, isRequired }, ref) => {
    return inputType === 'file' ? (
        <>
            <label htmlFor={inputName} className="btn">
                {title}
            </label>
            <input
                id={inputName}
                ref={ref}
                className="formitem-file-input"
                value={inputValue}
                name={inputName}
                type={inputType}
                onChange={onChange}
                required={isRequired}
            />
        </>
    ) : (
        <label className="formitem-label">
            {title}
            <input
                ref={ref}
                className="formitem-input"
                value={inputValue}
                name={inputName}
                type={inputType}
                onChange={onChange}
                required={isRequired}
            />
        </label>
    );
});

export default FormItem;