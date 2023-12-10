import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Swal from "sweetalert2";
import axios from "axios";
import "../../../index.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function NavbarBrand({ handlerNavbar }) {
  const location = useLocation();

  const navigate = useNavigate();

  function handlerBack() {
    Swal.fire({
      title: "Perubahan anda mungkin tidak tersimpan",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_BASE_URL}/checkout`)
          .then((res) => {
            if (res.data.status === "success") {
              navigate("/");
              console.log(res);
            } else {
              console.log(res);
            }
          })
          .catch((err) => console.log(err));
      }
    });
  }

  return (
    <>
      {location.pathname === "/checkout" ? (
        <div className="flex gap-4 items-center cursor-pointer" onClick={handlerBack}>
          <ArrowBackOutlinedIcon className="text-secondary" style={{ fontSize: "3rem" }} />
          <h1 className="text-light text-xl font-bold">JavaStore</h1>
        </div>
      ) : (
        <>
          <Link to="/" className="flex items-center gap-4">
            <img src={`${import.meta.env.VITE_BASE_URL}/images/logo/logo-white.png`} alt="logo" />
            <h1 className="text-light text-xl font-bold">JavaStore</h1>
            <MenuIcon
              className="text-light absolute right-6 hamburger-menu"
              style={{ fontSize: "2.5rem" }}
              onClick={handlerNavbar}
            />
          </Link>
          <Link to="/cart">
            <ShoppingCartOutlinedIcon className="text-light top-9 absolute right-1/4 hamburger-menu" />
          </Link>
        </>
      )}
    </>
  );
}

export default NavbarBrand;
