import React from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Link } from "react-router-dom";

function CartNavbar() {
  return (
    <div className="bg-primary flex items-center justify-center gap-4 lg:px-20 lg:py-10 py-5 w-full">
      <Link to="/" className="absolute lg:left-20 left-4">
        <ArrowBackOutlinedIcon className="text-secondary" style={{ fontSize: "3rem" }} />
      </Link>
      <h1 className="text-light lg:text-2xl text-xl capitalize">Keranjang Saya</h1>
    </div>
  );
}

export default CartNavbar;
