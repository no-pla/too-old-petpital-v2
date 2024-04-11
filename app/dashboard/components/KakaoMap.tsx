"use client";

import React, { useState } from "react";
import { Map } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  const [mapType, setMapType] = useState<"roadmap" | "skyview">("roadmap");

  return (
    <div>
      {/* 지도 스카이뷰 토글 */}
      <div className="absolute z-20 flex gap-4 right-6 top-7">
        <div className="flex bg-white rounded p-1 shadow-mapButtonShadow">
          <div
            id="btnRoadmap"
            className={`${mapType === "roadmap" ? "selected_btn bg-main text-white" : "btn"} p-2 rounded cursor-pointer`}
            onClick={() => setMapType("roadmap")}
          >
            지도
          </div>
          <div
            id="btnSkyview"
            className={`${mapType === "skyview" ? "selected_btn bg-main text-white" : "btn"} p-2 rounded cursor-pointer`}
            onClick={() => {
              setMapType("skyview");
            }}
          >
            스카이뷰
          </div>
        </div>
      </div>
      {/* 지도 */}
      <Map // 지도를 표시할 Container
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: "100vw",
          height: "100vh",
        }}
        level={3} // 지도의 확대 레벨
        mapTypeId={mapType === "roadmap" ? "ROADMAP" : "HYBRID"}
      ></Map>
    </div>
  );
};

export default KakaoMap;
