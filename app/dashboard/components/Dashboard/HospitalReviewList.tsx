"use client";

import React, { useRef, useState } from "react";
import ReviewList from "../Review/ReviewList";
import { GoChevronLeft } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { IoPencilOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { selectedHospital } from "@/share/atom";
import { RxShare2 } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import Image from "next/image";
import { useIsVisible } from "../../hooks/useIsVisible";

const HospitalReviewList = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const selectedHospitalInfo = useRecoilValue(selectedHospital);
  const [hospitalImage, setHospitalImage] = useState(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(targetRef);

  return (
    <div className="absolute left-[375px] tablet:left-0 max-w-[375px] w-full h-screen bg-[#fafafa] overflow-y-scroll shadow-dashboardShadow">
      <div
        className={`flex justify-between items-center pl-2 pr-4 text-white text-[12px] top-0 max-w-[375px] z-20 w-full fixed transition-colors ease-in-out duration-200 ${isVisible ? "bg-transparent" : "bg-main font-bold"}`}
      >
        <div className="py-3 flex items-center">
          <GoChevronLeft className="w-6 h-6" />
          <span>
            {isVisible ? "이전으로" : selectedHospitalInfo?.place_name}
          </span>
        </div>
        <div className="pr-4">
          <AiOutlineClose className="w-6 h-6" />
        </div>
      </div>
      <div>
        <Image
          src={
            hospitalImage ||
            "https://firebasestorage.googleapis.com/v0/b/petpital-v2-9d726.appspot.com/o/assets%2Fno_image_info.png?alt=media&token=8720e2e0-c1c4-4fd2-935e-37396666ae68"
          }
          width="375"
          height="296"
          className="object-cover	overflow-hidden h-[296px]"
          alt="병원 이미지"
        />
        <div className="flex items-center justify-between py-[9.5px] pl-[10px]">
          <div>
            <div className="font-bold">{selectedHospitalInfo?.place_name}</div>
            <div className="flex text-[12px] gap-1">
              <div className="before:content-['★'] text-main">4.1</div>
              <div className="text-[#e4e4e4]">•</div>
              <div className="text-[#9F9F9F] before:content-['방문자\00a0리뷰'] before:pr-1">
                000
              </div>
            </div>
          </div>
          <div className="mr-6 flex items-center gap-1">
            <RxShare2 className="w-5 h-5" />
            <CiHeart className="w-6 h-6" />
          </div>
        </div>
        <div
          ref={targetRef}
          className="px-1 py-[6.5px] flex border-y-[0.4px] border-y-[#e4e4e4]"
        >
          <button className="text-main p-2 mr-2">영수증 리뷰</button>
          <button className="p-2">최신순</button>
        </div>
      </div>
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
