import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Payment() {
  return (
    <>
      <div className="lg:w-1/5 h-full relative">
        <div className="h-full flex items-center justify-center ">
          <div className="absolute top-0 left-0 h-full w-1 bg-primary hidden lg:block"></div>
          <div className="flex flex-col items-center gap-4 p-4">
            <h1 className="capitalize lg:text-2xl text-center">Pilih metode pembayaran</h1>
            <div className="flex flex-col gap-4">
              <div className="flex bg-greyLight p-4 justify-between cursor-pointer">
                <p className="capitalize text-center">pakai promo</p>
                <ChevronRightIcon />
              </div>
              <div className="flex bg-greyLight p-4 justify-between cursor-pointer">
                <p className="capitalize text-center">metode pembayaran</p>
                <ChevronRightIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
