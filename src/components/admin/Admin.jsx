import React, { useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SellIcon from "@mui/icons-material/Sell";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../index.css";

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/varify`)
      .then((res) => {
        if (res.data.status === "success") {
          if (res.data.role !== "admin") {
            navigate(`/`);
          }
        } else {
          navigate(`/`);
        }
      })
      .catch((err) => console.log(err));
  });

  const handlerLogout = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/logout`)
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full grid grid-2 h-screen">
      <div className="bg-primary py-8 px-4 h-screen relative">
        <div>
          <a href="/admin">
            <span className="text-2xl text-light">JavaStore</span>
          </a>
        </div>
        <hr className="w-full text-secondary my-4" />
        <div>
          <ul>
            <li className={`mt-4`}>
              <Link
                to="/admin"
                className={`text-xl flex gap-4 w-full p-4 text-grey hover:bg-secondary hover:text-light ${
                  location.pathname === "/admin" ? "bg-secondary text-light font-semibold" : ""
                }`}
              >
                <DashboardIcon />
                Dashboard
              </Link>
            </li>
            <li className={`mt-4`}>
              <Link
                to="./users"
                className={`text-xl flex gap-4 w-full p-4 text-grey hover:bg-secondary hover:text-light ${
                  location.pathname === "/admin/users"
                    ? "bg-secondary text-light font-semibold"
                    : ""
                }`}
              >
                <PersonOutlineOutlinedIcon />
                Users
              </Link>
            </li>
            <li className={`mt-4 ml-8`}>
              <Link
                to="./add-new-user"
                className={`text-xl flex gap-4 w-full p-4 text-grey hover:bg-secondary hover:text-light ${
                  location.pathname === "/admin/add-new-user"
                    ? "bg-secondary text-light font-semibold"
                    : ""
                }`}
              >
                <AddIcon />
                Add New User
              </Link>
            </li>
            <li className={`mt-4`}>
              <Link
                to="./product"
                className={`text-xl flex gap-4 w-full p-4 text-grey hover:bg-secondary hover:text-light ${
                  location.pathname === "/admin/product"
                    ? "bg-secondary text-light font-semibold"
                    : ""
                }`}
              >
                <InventoryIcon />
                Product
              </Link>
            </li>
            <li className={`mt-4 ml-8`}>
              <Link
                to="./add-new-product"
                className={`text-xl flex gap-4 w-full p-4 text-grey hover:bg-secondary hover:text-light ${
                  location.pathname === "/admin/add-new-product"
                    ? "bg-secondary text-light font-semibold"
                    : ""
                }`}
              >
                <AddIcon />
                Add New Product
              </Link>
            </li>
          </ul>
        </div>
        <button
          className="bg-secondary p-4 text-light font-bold absolute bottom-12 right-4"
          onClick={handlerLogout}
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
