import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function NavbarButton({ navbarOpen }) {
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/varify`)
      .then((res) => {
        if (res.data.status === "success") {
          setIsLogin(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handlerLogout = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/logout`)
      .then((res) => {
        if (res.data.status === "success") {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`lg:flex gap-4 ${navbarOpen ? "block" : "hidden"}`}>
      {isLogin ? (
        <button
          className="w-full bg-secondary p-2 rounded text-lg block text-center mt-4 lg:mt-0"
          onClick={handlerLogout}
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            to="/register"
            className="bg-light p-2 rounded text-lg block text-center mt-4 lg:mt-0"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-secondary p-2 rounded text-lg block text-center mt-4 lg:mt-0"
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
}

export default NavbarButton;
