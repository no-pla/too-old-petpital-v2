import React from "react";
import { useFormContext } from "react-hook-form";

interface InputData {
  label: string;
  type: "email" | "password" | "text";
  validation?: ValidationTypes;
  id: string;
  placeholder: string;
}

interface ValidationTypes {
  required: {
    value: true;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: string) => boolean | string;
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
}

const Input = ({ label, type, validation, id, placeholder }: InputData) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  // console.log(errors);
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, validation)}
      />
      {errors && errors[id] && <p>{errors[id]?.message?.toString()}</p>}
    </div>
  );
};

export default Input;
