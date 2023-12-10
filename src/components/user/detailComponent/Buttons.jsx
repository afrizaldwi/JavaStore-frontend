import React from "react";
import { Toaster } from "react-hot-toast";

function Buttons({ handlerSetCart, handlerbuyNow, disabled }) {
  return (
    <div className="flex items-center justify-end gap-4 w-full">
      <div>
        <button
          className="bg-secondary py-2 px-4 uppercase rounded-lg text-sm lg:text-xl"
          onClick={handlerSetCart}
          disabled={disabled}
        >
          tambakan ke keranjang
        </button>
        <Toaster />
      </div>
      <div>
        <button
          className="bg-grey py-2 px-4 uppercase rounded-lg text-sm lg:text-xl"
          onClick={handlerbuyNow}
          disabled={disabled}
        >
          beli sekarang
        </button>
      </div>
    </div>
  );
}

export default Buttons;
