"use client";

import React, { useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HospitalIcon from "../../../public/icons/big.svg";

interface geoLocationData {
  center: {
    lat: number;
    lng: number;
  };
  errMsg?: null | string;
  isLoading?: boolean;
  isPanto?: boolean;
}

const KakaoMap = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [mapType, setMapType] = useState<"roadmap" | "skyview">("roadmap");
  const hospitalRef = useRef<HTMLInputElement>(null);
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>();
  const [hospitalName, setHospitalName] = useState<string>("");
  const [hospitalArray, setHospitalArray] = useState<any>();
  const [pagination, setPagination] = useState<any>();

  const [userLocation, setUserLocation] = useState<geoLocationData>({
    center: {
      lat: 37.5666805,
      lng: 126.9784147,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    const options = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setUserLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
        options
      );
    } else {
      setUserLocation((prev) => ({
        ...prev,
        errMsg: "현재 위치를 가져올 수 없습니다.",
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    // 검색
    if (!map) return;
    if (hospitalName === "") return;
    const ps = new kakao.maps.services.Places();
    setPagination(null);
    const hospital = hospitalName + "동물 병원";

    ps.keywordSearch(
      hospital,
      (data, status, pagination) => {
        if (status === kakao.maps.services.Status.ZERO_RESULT) {
          // TODO: 검색 결과 없을 때 처리
        }
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            });
            // }

            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          setMarkers(markers);

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
        // resetPagination();
        if (pagination.first !== pagination.last && pagination.last > 1) {
          setPagination(pagination);
        }
        setHospitalArray(data);
      },
      {
        category_group_code: "HP8",
      }
    );
  }, [hospitalName, map]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hospitalRef.current?.value) return;
    setHospitalName(hospitalRef.current.value);
  };

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
      {/* 마이 페이지 / 로그인 버튼 */}
      <div className="absolute bottom-6 right-6 z-20">
        {session?.user ? (
          <button
            onClick={() => router.push("/mypage")}
            className="bg-white border-main border-[0.4px] text-main py-[10.5px] px-8 rounded-sm shadow-mapButtonShadow"
          >
            마이페이지
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="bg-main text-white py-[10.5px] px-8 rounded-sm shadow-mapButtonShadow"
          >
            로그인
          </button>
        )}
      </div>
      <form onSubmit={(event) => onSubmit(event)}>
        <input
          className="absolute top-5 left-6 z-20"
          placeholder="병원을 검색해 주세요."
          ref={hospitalRef}
        />
      </form>
      {/* 지도 */}
      <Map
        center={{
          // 지도의 중심좌표
          lat: userLocation.center.lat,
          lng: userLocation.center.lng,
        }}
        style={{
          // 지도의 크기
          width: "100vw",
          height: "100vh",
        }}
        level={3} // 지도의 확대 레벨
        mapTypeId={mapType === "roadmap" ? "ROADMAP" : "HYBRID"}
        onCreate={setMap}
      >
        {/* 유저 위치 */}
        {!userLocation.isLoading && (
          <CustomOverlayMap
            position={{
              lat: userLocation.center.lat,
              lng: userLocation.center.lng,
            }}
          >
            <div className="border-[3px] border-main rounded-full w-14 h-14 shadow-mapShadow relative">
              {!session?.user && (
                <div className="bg-white -translate-x-1/3 p-2 absolute -top-[52px] rounded border-main border-[1px] shadow-mapShadow">
                  로그인하고 사용해 보세요.
                </div>
              )}
              <Image
                src={
                  session?.user?.image ||
                  "https://firebasestorage.googleapis.com/v0/b/petpital-v2-9d726.appspot.com/o/assets%2Fno-image.png?alt=media&token=238d004e-2082-4b8c-baf8-d65dcef4a8d8"
                }
                alt="유저 이미지"
                width={56}
                height={56}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </CustomOverlayMap>
        )}
        {/* 검색된 병원 핀 */}
        {markers.map((marker: any) => (
          <CustomOverlayMap
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
          >
            <div className="relative w-14 h-14 flex justify-center items-center">
              <div className="absolute -top-10 text-white bg-main border-[#24979E] border-[1px] font-bold p-2 rounded">
                {marker.content}
              </div>
              <Image
                src={HospitalIcon}
                alt="병원 아이콘"
                width={56}
                height={56}
                className="absolute top-0"
              />
            </div>
          </CustomOverlayMap>
        ))}
      </Map>
      <div>
        {pagination && (
          <>
            <div className="z-20 absolute bottom-6 left-4">
              <button onClick={() => pagination.prevPage()}>이전</button>
              <button onClick={() => pagination.nextPage()}>다음</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KakaoMap;
