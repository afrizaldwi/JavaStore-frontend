import React, { useEffect, useState } from "react";
import Banner from "../homepageComponent/Banner";
import SearchBar from "../homepageComponent/SearchBar";
import CardsProduct from "../homepageComponent/CardsProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../userComponent/Navbar";
import SearchPage from "../homepageComponent/searchComponent/SearchPage";

function Homepage() {
  const navigate = useNavigate();
  const [onsearch, setOnSearch] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/varify`)
      .then((res) => {
        if (res.data.status === "success") {
          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function handlerOnSearch() {
    setOnSearch(true);
  }
  function handlerClose() {
    setOnSearch(false);
  }
  return (
    <>
      <div className="bg-grey">
        <div className={`relative ${onsearch ? "blur-xl overflow-hidden h-screen" : ""}`}>
          <Navbar />
          <Banner />
          <SearchBar handlerOnSearch={handlerOnSearch} />
          <CardsProduct />
        </div>
        {onsearch && <SearchPage setSearch={handlerClose} />}
      </div>
    </>
  );
}

export default Homepage;
