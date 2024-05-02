import React from "react";

const SearchInput = () => {
  return (
    <div className="absolute top-5 left-6 z-20">
      <input
        className="border-[1px] pl-11 py-3"
        placeholder="동물 병원을 입력해 보세요."
      />
    </div>
  );
};

export default SearchInput;
