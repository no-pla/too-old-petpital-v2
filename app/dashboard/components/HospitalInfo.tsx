import { selectedHospital } from "@/share/atom";
import React from "react";
import { Roadview } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import { RxShare2 } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";

const HospitalInfo = () => {
  const selectedHospitalInfo = useRecoilValue(selectedHospital);

  return (
    <div>
      <Roadview // 로드뷰를 표시할 Container
        position={{
          // 지도의 중심좌표
          lat: Number(selectedHospitalInfo?.y!),
          lng: Number(selectedHospitalInfo?.x!),
          radius: 50,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "296px",
        }}
      />
      <div className="flex items-center justify-between py-[9.5px] px-[10px]">
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
      <div className="px-1 py-[6.5px] flex border-y-[0.4px] border-y-[#e4e4e4]">
        <button className="text-main p-2 mr-2">영수증 리뷰</button>
        <button className="p-2">최신순</button>
      </div>
    </div>
  );
};

export default HospitalInfo;
