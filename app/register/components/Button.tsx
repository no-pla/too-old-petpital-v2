import React from "react";

interface ButtonData {
  text: string;
  disabled: boolean;
}

const Button = ({ text, disabled }: ButtonData) => {
  return (
    <button
      disabled={disabled}
      className="text-white font-bold text-[20px] text-center bg-main py-4 rounded disabled:opacity-75"
    >
      {text}
    </button>
  );
};

export default Button;
