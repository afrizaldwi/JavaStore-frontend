import React from "react";

function CheckoutData({ nama, image, jumlahProduct, hargaAwal }) {
  return (
      <>
        <img
          src={`${import.meta.env.VITE_BASE_URL}/images/product/${image}`}
          alt="image product"
          className="w-40 aspect-square"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">
            {nama} <span className="italic">{jumlahProduct}X</span>
          </h1>
          <p className="text-2xl">{hargaAwal.toLocaleString("id-ID")}</p>
        </div>
      </>
  );
}

export default CheckoutData;
