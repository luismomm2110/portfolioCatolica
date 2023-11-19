import React from "react";

import './styles.css';

export type Input = {
    id: string;
    type: string;
    placeholder: string;
    name?: string;
    label: string;
    value: string;
    min?: string;
    error: string;
    required?: boolean;
    disabled?: boolean;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ReusableInput: React.FC<Input> = (props) => {
    return (
        <>
            <label htmlFor={props.id}>{props.label}:</label>
            <input
                className={props.error ? 'error' : ''}
                id={props.id}
                type={props.type}
                min={props.min}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value || ''}
                onChange={props.handleChange}
                disabled={props.disabled ?? false}/>
            <div className="error">
                {props.error && <span>{props.error}</span>}
            </div>
        </>
    )
}