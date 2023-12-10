import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CheckoutData from "../checkoutComponent/CheckoutData";
import Payment from "../checkoutComponent/Payment";
import Address from "../checkoutComponent/Address";
import ServiceOrder from "../checkoutComponent/ServiceOrder";
import Navbar from "../userComponent/Navbar";

function Checkout() {
  const [datas, setDatas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/varify`)
      .then((res) => {
        if (res.data.status !== "success") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/checkout`)
      .then((res) => {
        if (res.data.status === "success") {
          setDatas(res.data.checkoutData);
        } else if (res.data.checkoutData.length < 1) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function handlerCheckout() {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/checkoutData`, datas)
      .then((res) => {
        if (res.data.status === "success") {
          Swal.fire({
            title: "Checkout Berhasil!!",
            icon: "success",
          }).then((res) => {
            if (res.isConfirmed) {
              navigate("/");
            }
          });
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Navbar />
      <div className="lg:px-20 px-2 bg-greyLight relative" style={{ minHeight: "90vh" }}>
        <h1 className="capitalize py-4 lg:py-8 lg:text-2xl">Checkout produkmu</h1>
        <div className="bg-f4 relative lg:flex">
          <div className="grid lg:grid-cols-3 grid-cols-1 lg:w-4/5 lg:p-8">
            {datas.map((data, index) => {
              const jumlahProduct = data.hargaAkhir / data.hargaAwal;
              return (
                <div className="flex items-center gap-4 w-full lg:w-4/5" key={index}>
                  <CheckoutData
                    index={index}
                    nama={data.nama}
                    image={data.image}
                    jumlahProduct={jumlahProduct}
                    hargaAwal={data.hargaAwal}
                  />
                </div>
              );
            })}
          </div>
          <Payment />
        </div>
        <div className="lg:flex lg:gap-12 gap-2 mt-8">
          <Address />
          <ServiceOrder />
        </div>
        <div className="lg:absolute lg:right-20 bottom-0">
          <button
            className="capitalize text-xl bg-secondary w-full lg:w-auto text-light p-4 font-bold"
            onClick={handlerCheckout}
          >
            Checkout sekarang
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
