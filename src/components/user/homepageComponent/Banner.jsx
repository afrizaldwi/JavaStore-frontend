import React from "react";

function Banner() {
  return (
    <div className="w-full flex items-center justify-center">
      <img
        src={`${import.meta.env.VITE_BASE_URL}/images/banner/banner 1.png`}
        alt="banner"
        className="w-full px-6 lg:px-20"
      />
    </div>
  );
}

export default Banner;
