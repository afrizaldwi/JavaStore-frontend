import axios from "axios";
import React, { useEffect, useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SellIcon from "@mui/icons-material/Sell";

import InventoryIcon from "@mui/icons-material/Inventory";
import { Link } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState({});
  const [users, setUsers] = useState({});
  const [history, setHistory] = useState({});

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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users`)
      .then((res) => {
        if (res.data.status === "success") {
          setUsers(res.data.users);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="p-8 flex justify-center gap-8">
        <div className="bg-primary w-1/4 h-56 flex flex-col justify-center items-center gap-4 relative">
          <h1 className="absolute top-4 text-light text-xl capitalize text-center">
            total product
          </h1>
          <InventoryIcon className="text-light" style={{ fontSize: "3rem" }} />
          <h1 className="text-light text-center text-xl">{products.length}</h1>
          <Link
            to="./product"
            className="bg-greyDark font-medium w-full text-center capitalize absolute bottom-0 p-2 hover:brightness-90"
          >
            lihat selengkapnya
          </Link>
        </div>
        <div className="bg-primary w-1/4 h-56 flex flex-col justify-center items-center gap-4 relative">
          <h1 className="absolute top-4 text-light text-xl capitalize text-center">total user</h1>
          <PersonOutlineOutlinedIcon className="text-light" style={{ fontSize: "3rem" }} />

          <h1 className="text-light text-center text-xl">{users.length}</h1>
          <Link
            to="./users"
            className="bg-greyDark font-medium w-full text-center capitalize absolute bottom-0 p-2 hover:brightness-90"
          >
            lihat selengkapnya
          </Link>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
