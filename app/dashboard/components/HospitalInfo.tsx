import React, { useEffect, useState } from "react";
import { selectedHospital } from "@/share/atom";
import { useRecoilValue } from "recoil";
import { RxShare2 } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import Image from "next/image";

const HospitalInfo = () => {
  const selectedHospitalInfo = useRecoilValue(selectedHospital);
  const [hospitalImage, setHospitalImage] = useState(null);

  useEffect(() => {
    const getHospitalImage = async () => {
      if (!selectedHospitalInfo) return;
      const roadAddress = selectedHospitalInfo?.road_address_name.split(" ")!;
      const hospitalName = `${roadAddress[0]} ${roadAddress[1]} ${selectedHospitalInfo?.place_name}`;

      const res = await fetch(`/api/hospital?hospital=${hospitalName}`, {
        method: "GET",
      });

      const { image } = await res?.json();
      setHospitalImage(image);
    };

    getHospitalImage();
  }, [selectedHospitalInfo]);

  return (
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
      <div className="px-1 py-[6.5px] flex border-y-[0.4px] border-y-[#e4e4e4]">
        <button className="text-main p-2 mr-2">영수증 리뷰</button>
        <button className="p-2">최신순</button>
      </div>
    </div>
  );
};

export default HospitalInfo;
