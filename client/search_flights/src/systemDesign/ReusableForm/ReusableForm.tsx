import React, { useState } from 'react';

import './ReusableForm.css'
import {ReusableButton} from "../Button/ReusableButton";

type Field = {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  value: string;
};

type ReusableFormProps = {
  formTitle: string;
  fields: Field[];
  onSubmit: any;
};

const ReusableForm: React.FC<ReusableFormProps> = ({ formTitle, fields, onSubmit }) => {

  return (
    <form className={'reusableForm'}>
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
            value={field.value || ''}
          />
        </div>
      ))}
      <ReusableButton description={'Submit'}  label={'Login'} />
    </form>
  );
};

export default ReusableForm;
