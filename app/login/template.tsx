import React from "react";

const template = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#FAFAFA] h-full min-w-screen min-h-screen flex justify-center items-center py-[60px] tablet:px-2 tablet:py-10">
      {children}
    </div>
  );
};

export default template;
