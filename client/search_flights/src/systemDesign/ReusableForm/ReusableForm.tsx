import React from 'react';

import './ReusableForm.css'
import {ReusableButton} from "../Button/ReusableButton";
import {Input, ReusableInput} from "../ReusableInput/ReusableInput";

type ReusableFormProps = {
  formTitle: string;
  fields: Input[];
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
            <ReusableInput
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                label={field.label}
                value={field.value}
                error={field.error}
                handleChange={handleChange}
                disabled={field.disabled}/>
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
