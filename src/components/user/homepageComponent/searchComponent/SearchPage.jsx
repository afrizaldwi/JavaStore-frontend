import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchPage({ setSearch }) {
  const [query, setQuery] = useState("");
  const [dataSearch, setDataSearch] = useState({});
  const [onSearch, setOnSearch] = useState(false);

  function handlerSubmitSearch(e) {
    e.preventDefault();

    const config = {
      headers: { "content-type": "application/json" },
    };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/search`, { query }, config)
      .then((res) => {
        if (res.data.status === "success") {
          setDataSearch(res.data.data);
          setOnSearch(true);
        } else {
          setOnSearch(false);
        }
      })
      .catch((err) => console.log(err));
  }

  function handlerClose(event) {
    if (event.target.className.includes("search-screen")) {
      setSearch();
    }
  }

  return (
    <div
      className="absolute w-screen h-screen top-0 flex items-center justify-center search-screen"
      onClick={handlerClose}
    >
      <div className="lg:w-auto w-full">
        <div>
          <form className="flex px-6 justify-center w-full" onSubmit={handlerSubmitSearch}>
            <input
              type="text"
              placeholder="Search something....."
              // className="p-4 px-6 lg:w-[1000px] bg-greyLight"
              className="lg:p-4 lg:w-[1000px] p-2 w-full bg-greyLight"
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <input
              type="submit"
              value="Search"
              // className="py-4 px-6 bg-secondary text-black font-semibold text-lg"
              className="lg:py-4 lg:px-6 p-2 bg-secondary text-black lg:font-semibold lg:text-lg"
            />
          </form>
        </div>
        <div className="px-6">
          {onSearch &&
            dataSearch.map((data, index) => {
              return (
                <div className="bg-grey lg:px-8 lg:py-4 p-2 " key={index}>
                  <Link to={`/product/${data._id}`} className="flex gap-4 lg:p-8 bg-greyDark">
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/images/product/${data.image}`}
                      alt="product image"
                      className="lg:w-32 w-10 aspect-square"
                    />
                    <div className="text-black lg:text-2xl">
                      <h1>{data.nama}</h1>
                      <p>Rp {data.harga.toLocaleString("id-ID")}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
