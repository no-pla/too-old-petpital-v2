import { atom } from "recoil";

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

export const searchedHospital = atom({
  key: "searchedHospital",
  default: null,
});

export const hospitalPagination = atom({
  key: "hospitalPagination",
  default: null,
});

export const selectedHospital = atom<hospitalData | null>({
  key: "selectedHospital",
  default: null,
});
