import React from "react";
import { useFormContext } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";

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
    resetField,
    getValues,
    formState: { errors },
  } = useFormContext();

  const resettingField = () => resetField(id);

  return (
    <div>
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <div className="relative my-[8px]">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, validation)}
          className="border-[1px] border-[#c5c5c5] py-[18.5px] px-6 font-[16px] w-full focus:border-main outline-none"
        />
        {getValues(id) !== "" && (
          <button
            onClick={() => resettingField()}
            className="absolute top-1/2 transform right-4 -translate-y-1/2"
          >
            <IoCloseCircle color="#9F9F9F" className="w-6 h-6" />
          </button>
        )}
      </div>
      {errors && errors[id] && (
        <p className="text-warn">{errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
};

export default Input;
