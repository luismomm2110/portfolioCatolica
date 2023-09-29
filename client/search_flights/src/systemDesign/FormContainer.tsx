import React, { useState } from 'react';

import './FormContainer.css'

type Field = {
  id: string;
  type: string;
  placeholder: string;
  label: string;
};

type ReusableFormProps = {
  formTitle: string;
  fields: Field[];
  onSubmit: any;
};

const ReusableForm: React.FC<ReusableFormProps> = ({ formTitle, fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
            value={formData[field.id] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit" aria-label="submit">Submit</button>
    </form>
  );
};

export default ReusableForm;
