import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GoChevronLeft } from "react-icons/go";

const Dashboard = ({
  children,
  second,
}: {
  children: React.ReactNode;
  second?: boolean;
}) => {
  return (
    <div
      className={`absolute ${second === true && "left-[375px] tablet:left-0"} max-w-[375px] w-full h-screen bg-[#fafafa] overflow-y-scroll shadow-dashboardShadow`}
    >
      <div className="flex justify-between items-center pl-2 pr-4 bg-main text-white text-[12px]">
        <div className="py-3 flex items-center">
          <GoChevronLeft className="w-6 h-6" />
          <span>이전으로</span>
        </div>
        <div className="pr-4">
          <AiOutlineClose className="w-6 h-6" />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Dashboard;
