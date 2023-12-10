import React, { useEffect, useState } from "react";
import axios from "axios";
import CartNavbar from "../cartComponent/Navbar";
import CartDatas from "../cartComponent/Datas";
import NotLogin from "../cartComponent/NotLogin";

function Cart() {
  const [isLogin, setLogin] = useState(false);
  const [username, setUsername] = useState();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/varify`)
      .then((res) => {
        if (res.data.status === "success") {
          setUsername(res.data.username);
          setLogin(true);
        }
      })
      .catch((err) => console.log(err));
  });
  return (
    <div>
      {isLogin ? (
        <>
          <CartNavbar />
          <CartDatas dataUsername={username} />
        </>
      ) : (
        <NotLogin />
      )}
    </div>
  );
}

export default Cart;
