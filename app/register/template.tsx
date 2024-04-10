import Image from "next/image";
import React from "react";

const template = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#FAFAFA] h-full min-w-screen min-h-screen flex justify-center items-center pt-[80px] pb-[120px] tablet:px-8 tablet:py-10">
      <div className="mx-auto w-full max-w-[466px]">
        <Image
          src="/logo/logo.png"
          alt="펫피탈 로고"
          width={368}
          height={0}
          layout="responsive"
          className="mx-auto mb-16 max-w-[60%] min-w-[182px] tablet:mb-10"
        />
        {children}
      </div>
    </div>
  );
};

export default template;
