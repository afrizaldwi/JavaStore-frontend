import React, { useEffect, useState } from "react";
import axios from "axios";

import "../../../index.css";
import { Link } from "react-router-dom";

function CardsProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/product`)
      .then((res) => {
        if (res.data.status === "success") {
          setProducts(res.data.products);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full px-6 lg:px-20 grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-4 place-items-center gap-4">
      {products.map((product, index) => {
        return (
          <div key={index} className="shadow-xl p-4 bg-light flex flex-col gap-4">
            <div className="w-full">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/images/product/${product.image}`}
                alt="image"
                className="lg:w-52 w-28 aspect-square m-auto"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-light">{product.tipe}</p>
              <h1 className="font-bold ">{product.nama}</h1>
              <p className="text-column font-light">{product.desc}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-bold">{product.harga.toLocaleString("id-ID")}</p>
              <Link
                to={`/product/${product._id}`}
                className="p-4 bg-secondary capitalize text-light font-bold"
              >
                detail
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardsProduct;
