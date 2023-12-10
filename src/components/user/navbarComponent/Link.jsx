import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useLocation } from "react-router-dom";

function NavbarLink({ navbarOpen }) {
  const location = useLocation();
  return (
    <ul
      className={`lg:flex items-center gap-4 text-lg relative ${navbarOpen ? "block" : "hidden"}`}
    >
      <li>
        <Link
          to="/"
          className="text-grey block p-2 mt-4 lg:mt-0 hover:bg-secondary hover:text-light md:hover:bg-transparent"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="text-grey block p-2 mt-4 lg:mt-0 hover:bg-secondary hover:text-light md:hover:bg-transparent"
        >
          category
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="text-grey block p-2 mt-4 lg:mt-0 hover:bg-secondary hover:text-light md:hover:bg-transparent"
        >
          product
        </Link>
      </li>
      {location.pathname !== "/checkout" && (
        <li className="absolute left-96 hidden lg:block">
          <Link to="/cart">
            <ShoppingCartOutlinedIcon className="text-grey" />
          </Link>
        </li>
      )}
    </ul>
  );
}

export default NavbarLink;
