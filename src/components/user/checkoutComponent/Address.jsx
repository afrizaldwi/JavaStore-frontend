import React from "react";

function Address() {
  return (
    <div className="lg:w-2/5 w-full bg-f4">
      <h1 className="capitalize py-4 lg:text-2xl p-4">alamat pengiriman</h1>
      <hr className="bg-primary w-full h-1" />
      <textarea rows="8" className="w-full bg-f4 resize-none p-4" placeholder="Masukkan Alamat Pengiriman..."></textarea>
    </div>
  );
}

export default Address;
