import { atom } from "recoil";

export const searchedHospital = atom({
  key: "searchedHospital",
  default: null,
});

export const hospitalPagination = atom({
  key: "hospitalPagination",
  default: null,
});
