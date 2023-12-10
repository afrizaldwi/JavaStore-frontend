import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNewProduct() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    namaProduct: "",
    tipeProduct: "",
    harga: "",
    gambar: "",
    desc: "",
  });

  const handlerSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nama", data.namaProduct);
    formData.append("tipe", data.tipeProduct);
    formData.append("harga", data.harga);
    formData.append("desc", data.desc);
    formData.append("image", data.gambar);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/product`, formData, config)
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/admin/product");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-screen flex justify-center py-12">
      <form className={`w-full relative`} onSubmit={handlerSubmit}>
        <h1 className="text-center text-2xl font-bold">Add New Product</h1>
        <div className="mt-8">
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="product">Nama Product</label>
            <input
              type="text"
              id="product"
              className="w-full p-4 border rounded-xl"
              onChange={(e) => setData({ ...data, namaProduct: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="tipe">Tipe Product</label>
            <input
              type="text"
              id="tipe"
              className="w-full p-4 border rounded-xl"
              onChange={(e) => setData({ ...data, tipeProduct: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="harga">Harga</label>
            <input
              type="number"
              id="harga"
              className="w-full p-4 border rounded-xl"
              onChange={(e) => setData({ ...data, harga: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="gambar">Gambar</label>
            <input
              type="file"
              id="gambar"
              name="image"
              onChange={(e) => setData({ ...data, gambar: e.target.files[0] })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="desc">Deskripsi</label>
            <textarea
              rows="5"
              id="desc"
              className="resize-none border rounded-xl p-4"
              onChange={(e) => setData({ ...data, desc: e.target.value })}
            ></textarea>
          </div>
          <input
            type="submit"
            value="Add"
            className="px-8 py-4 bg-secondary text-light rounded absolute right-12 text-xl font-bold cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default AddNewProduct;
