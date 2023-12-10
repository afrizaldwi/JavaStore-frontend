import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

function AdminLogin() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const handlerSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/loginAdmin`, values)
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/admin");
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-grey">
      <div className="relative">
        <Link to="/" className="absolute top-4 left-4 cursor-pointer">
          <ArrowBackIcon style={{ fontSize: "3rem" }} />
        </Link>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <div className=" shadow-xl p-4 w-[500px] h-[500px] flex flex-col items-center justify-center bg-light ">
          <div className="text-2xl font-bold mb-4">
            <div className="text-red-500">{error}</div>
            <h1 className="text-center">Admin Login</h1>
          </div>
          <form onSubmit={handlerSubmit} className="w-full px-4 grid">
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                className="p-2 w-full"
                required
                onChange={(e) => setValues({ ...values, username: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="p-2 w-full"
                required
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="bg-secondary text-black font-bold p-4 rounded-2xl text-xl mx-20 mt-4 "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
