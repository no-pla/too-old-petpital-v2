"use client";

import React, { useState } from "react";
import ReviewList from "../Review/ReviewList";
import { IoPencilOutline } from "react-icons/io5";
import HospitalInfo from "./HospitalInfo";

const HospitalReviewList = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className="absolute left-[375px] tablet:left-0 max-w-[375px] w-full h-screen bg-[#fafafa] overflow-y-scroll shadow-dashboardShadow">
      <HospitalInfo />
      <ReviewList />
      <button
        onClick={() => setShowReviewForm(true)}
        className="bg-main text-white w-full sticky bottom-0 py-[18.5px] font-bold flex justify-center items-center gap-4 pr-6"
      >
        <IoPencilOutline className="w-6 h-6" />
        리뷰 작성
      </button>
    </div>
  );
};

export default HospitalReviewList;
