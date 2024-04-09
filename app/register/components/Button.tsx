import React from "react";

interface ButtonData {
  text: string;
}

const Button = ({ text }: ButtonData) => {
  return (
    <button className="text-white font-bold text-[20px] text-center bg-main py-4 rounded">
      {text}
    </button>
  );
};

export default Button;
