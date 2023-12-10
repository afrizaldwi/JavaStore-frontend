import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNewUser() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  function handlerSubmit(e) {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/register`, data)
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/admin/users");
          console.log(res.data);
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="w-full h-screen flex justify-center py-12">
      <form className={`w-full relative`} onSubmit={handlerSubmit}>
        <h1 className="text-center text-2xl font-bold">Add New User</h1>
        <div className="text-red-500 font-bold mt-4 text-xl text-center">{message}</div>
        <div className="mt-8">
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="username" className="capitalize">
              username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-4 border rounded-xl"
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="password" className="capitalize">
              password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-4 border rounded-xl"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full px-12 my-8">
            <label htmlFor="role" className="capitalize">
              role
            </label>
            <select
              name="role"
              id="role"
              className="w-full p-4 border rounded-xl"
              onChange={(e) => setData({ ...data, role: e.target.value })}
              required
            >
              <option value="">Pilih Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <input
            type="submit"
            value="Add"
            className="px-8 py-4 bg-secondary text-light rounded absolute right-12 text-xl font-bold cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default AddNewUser;
