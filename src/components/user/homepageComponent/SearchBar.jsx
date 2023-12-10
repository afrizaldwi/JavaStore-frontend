import React from "react";

function SearchBar({ handlerOnSearch }) {
  return (
    <>
      <div className="w-full flex items-center justify-center flex-col gap-4 lg:my-12">
        <h1 className="lg:text-3xl text-lg">All products</h1>
        <form className="lg:shadow-lg flex justify-center items-center w-full px-6 lg:px-0 lg:w-auto">
          <input
            type="text"
            placeholder="Search something....."
            className="lg:p-4 lg:w-[1000px] p-2 w-full bg-greyLight"
            onClick={handlerOnSearch}
          />
          <input
            type="submit"
            value="Search"
            className="lg:py-4 lg:px-6 p-2 bg-secondary text-black lg:font-semibold lg:text-lg"
          />
        </form>
      </div>
    </>
  );
}

export default SearchBar;
