import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import toast from "react-hot-toast";
import Buttons from "../detailComponent/Buttons";

function Detail() {
  const [disabled, setDisabled] = useState(true);
  const [cart, setCart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [count, setCount] = useState(1);
  const [username, setUsername] = useState("");
  const [data, setData] = useState({
    nama: "",
    tipe: "",
    harga: 0,
    image: "",
    desc: "",
  });

  const { _id } = useParams();

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/varify`)
      .then((res) => {
        if (res.data.status === "success") {
          setUsername(res.data.username);
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/product/${_id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setData(res.data.product);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  function handlerSetCart() {
    setCart(!cart);
  }
  let total = 0;
  if (count >= 1) {
    total = data.harga * count;
  }
  const newData = {
    cartId: data._id,
    username: username,
    nama: data.nama,
    tipe: data.tipe,
    hargaAwal: data.harga,
    hargaAkhir: total,
    image: data.image,
    desc: data.desc,
  };

  if (count < 1) {
    setCount(1);
  }

  function handlerCart() {
    const notify = () =>
      toast("Produk berhasil ditambahkan ke keranjang", {
        duration: 1000,
      });

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/cart`, newData)
      .then((res) => {
        if (res.data.status === "success") {
          notify();
        }
      })
      .catch((err) => console.log(err));
  }

  function handlerbuyNow() {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/checkout`, newData)
      .then((res) => {
          if (res.data.status === "success") {
          navigate("/checkout");
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const handlerResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      }
    };

    window.addEventListener("resize", handlerResize);

    handlerResize();

    // Detach the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handlerResize);
    };
  }, []);

  return (
    <div className="bg-grey w-full min-h-screen flex justify-center items-center lg:py-8 overflow-x-hidden">
      <div className="bg-primary h-full relative lg:w-2/3 w-full mx-auto lg:p-8 p-4">
        <Link to={"/"}>
          <ArrowBackOutlinedIcon className="text-secondary" style={{ fontSize: "3rem" }} />
        </Link>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 my-8 w-full">
          <img
            src={`${import.meta.env.VITE_BASE_URL}/images/product/${data.image}`}
            alt="image"
            className="w-2/4 m-auto"
          />
          <div className="w-2/3 flex flex-col lg:gap-8">
            <h1 className="lg:text-5xl text-2xl text-light">{data.nama}</h1>
            <p className="lg:text-4xl text-xl text-light">{data.harga.toLocaleString("id-ID")}</p>
          </div>
        </div>
        <div className="w-full">
          <Buttons
            disabled={disabled}
            handlerSetCart={handlerSetCart}
            handlerbuyNow={handlerbuyNow}
          />
          <div className=" top-20 text-lg">
            <p className="text-light my-4 ">Detail</p>
            {isMobile ? (
              <div className="text-light">{data.desc}</div>
            ) : (
              <pre className="text-light">{data.desc}</pre>
            )}
          </div>
        </div>
      </div>
      {cart && (
        <div className="fixed bottom-0 bg-light pt-8 w-full">
          <div className="lg:w-2/3 px-2 m-auto relative">
            <button className="absolute right-2 text-2xl font-bold" onClick={handlerSetCart}>
              X
            </button>
            <div className="flex gap-4">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/images/product/${data.image}`}
                alt="image"
                className="lg:w-52 w-1/4 aspect-square"
              />
              <div className="w-2/3 flex flex-col gap-4">
                <h1 className="lg:text-2xl text-primary">{data.nama}</h1>
                <p className="lg:text-2xl text-primary">{data.harga.toLocaleString("id-ID")}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-secondary py-2 px-4 rounded-lg"
                onClick={() => setCount((count) => count + 1)}
              >
                +
              </button>
              <p className="px-6 py-2">{count}</p>
              <button
                className="bg-secondary py-2 px-4 rounded-lg"
                onClick={() => setCount((count) => count - 1)}
              >
                -
              </button>
            </div>
            <div className="mt-8 flex items-center gap-4 p-2 lg:p-4">
              <h1 className="capitalize lg:text-2xl font-bold">total</h1>
              <p className="lg:text-2xl">{total.toLocaleString("id-ID")}</p>
              <button
                className="capitalize bg-secondary lg:p-4 p-2 lg:text-2xl absolute right-0 bottom-0"
                onClick={handlerCart}
              >
                tambahkan ke keranjang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
