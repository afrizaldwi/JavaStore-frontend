import React, { useState } from "react";
import NavbarLink from "../navbarComponent/Link";
import NavbarButton from "../navbarComponent/Button";
import NavbarBrand from "../navbarComponent/Brand";

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  function handlerNavbar() {
    setNavbarOpen(!navbarOpen);
  }

  return (
    <>
      <div className="w-full lg:flex items-center justify-between px-6 py-4 bg-primary lg:px-20 sticky top-0">
        <NavbarBrand handlerNavbar={handlerNavbar} />
        <NavbarLink navbarOpen={navbarOpen} />
        <NavbarButton navbarOpen={navbarOpen} />
      </div>
    </>
  );
}

export default Navbar;
