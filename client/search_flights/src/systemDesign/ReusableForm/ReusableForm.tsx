import React from 'react';

import './ReusableForm.css'
import {ReusableButton} from "../Button/ReusableButton";

type Field = {
  id: string;
  type: string;
  placeholder: string;
  name?: string;
  label: string;
  value: string;
  error: string;
  disabled?: boolean;
};

type ReusableFormProps = {
  formTitle: string;
  fields: Field[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitText?: string;
};

const ReusableForm: React.FC<ReusableFormProps> = ({ formTitle, fields, handleSubmit, handleChange, submitText }) => {
  const isDisabled = () => {
    const isThereAnError = fields.some((field) => field.error !== '');
    const isThereAnEmptyField = fields.some((field) => field.value === '');
    return isThereAnError || isThereAnEmptyField;
  }


  return (
    <form className={'reusableForm'} onSubmit={handleSubmit}>
      <header>
        <h2>{formTitle}</h2>
      </header>
      {fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id}>{field.label}:</label>
          <input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            name={field.name}
            value={field.value || ''}
            onChange={handleChange}
            disabled={field.disabled ?? false}
          />
          <div className="error">
            {field.error && <span>{field.error}</span>}
          </div>
        </div>
      ))}
      <ReusableButton
          description={submitText ?? 'Submit'}
          label={submitText ?? 'Submit'}
          disabled={isDisabled()}
      />
    </form>
  );
};

export default ReusableForm;
