import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const OAuthButton = ({
  type,
  onClick,
}: {
  type: "google" | "naver";
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="border-[0.4px] border-[#c5c5c5] bg-[#FAFAFA] rounded-full w-[50px] h-[50px] flex justify-center items-center"
    >
      {type === "naver" && (
        <Image
          src="/icons/btnG_아이콘원형.png"
          width={40}
          height={40}
          alt="네이버 아이디로 로그인"
        />
      )}
      {type === "google" && <FcGoogle className="w-10 h-10" />}
    </button>
  );
};

export default OAuthButton;
