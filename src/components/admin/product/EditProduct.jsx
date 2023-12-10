import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const [data, setData] = useState({
    nama: "",
    tipe: "",
    harga: "",
    desc: "",
    image: "",
  });
  const { _id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/product/${_id}`)
      .then((res) => {
        setData({
          ...data,
          nama: res.data.product.nama,
          tipe: res.data.product.tipe,
          harga: res.data.product.harga,
          desc: res.data.product.desc,
          image: res.data.product.image,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handlerSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`${import.meta.env.VITE_BASE_URL}/product/${_id}`, data)
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
        <h1 className="text-center text-2xl font-bold">Edit Product</h1>
        <div className="mt-8">
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="product">Nama Product</label>
            <input
              type="text"
              name="product"
              id="product"
              className="w-full p-4 border rounded-xl"
              value={data.nama}
              onChange={(e) => setData({ ...data, nama: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="tipe">Tipe Product</label>
            <input
              type="text"
              name="tipe"
              id="tipe"
              className="w-full p-4 border rounded-xl"
              value={data.tipe}
              onChange={(e) => setData({ ...data, tipe: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="harga">Harga</label>
            <input
              type="number"
              id="harga"
              className="w-full p-4 border rounded-xl"
              value={data.harga}
              onChange={(e) => setData({ ...data, harga: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="desc">Deskripsi</label>
            <textarea
              name="desc"
              id="desc"
              rows="10"
              className="resize-none border rounded-xl px-4 py-4"
              value={data.desc}
              onChange={(e) => setData({ ...data, desc: e.target.value })}
            ></textarea>
          </div>
          <input
            type="submit"
            className="px-8 py-4 bg-secondary text-light rounded absolute right-12 text-xl font-bold cursor-pointer"
            value="Edit"
          />
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
