import { searchedHospital } from "@/share/atom";
import React from "react";
import { useRecoilState } from "recoil";

interface hospitalData {
  address_name: string;
  category_group_code: string;
  category_group_name: "병원";
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

const HospitalList = ({ pagination }: { pagination: any }) => {
  const [hospitalArray, setHospitalArray] =
    useRecoilState<any>(searchedHospital);

  console.log(pagination);

  return (
    <div>
      {hospitalArray?.map((hospital: hospitalData, index: number) => {
        return (
          <div
            key={hospital?.id}
            className={`pl-[18px] pt-3 pb-2 flex flex-col ${index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"}`}
          >
            <div className="flex items-center">
              <div className="pr-4 font-bold text-main text-[20px] w-8">
                {String.fromCharCode(65 + index)}
              </div>
              <div className="font-bold text-[16px]">{hospital.place_name}</div>
            </div>
            <div className="flex text-[12px] gap-1">
              <div className="before:content-['★'] text-main">4.1</div>
              <div className="text-[#e4e4e4]">•</div>
              <div className="text-[#9F9F9F] before:content-['방문자\00a0리뷰'] before:pr-1">
                000
              </div>
            </div>
          </div>
        );
      })}
      <div>
        {pagination && (
          <>
            <div className="z-20  bottom-6 left-4">
              <button
                onClick={() => pagination.prevPage()}
                className={`${pagination?.hasPrevPage ? "bg-main" : "bg-[#c5c5c5]"} text-white w-1/2 py-2`}
              >
                이전
              </button>
              <button
                onClick={() => pagination.nextPage()}
                className={`${pagination?.hasNextPage ? "bg-main" : "bg-[#c5c5c5]"} text-white py-2 w-1/2`}
              >
                다음
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HospitalList;