import React from "react";
import { Link } from "react-router-dom";

function NotLogin() {
  return (
    <div className="h-screen w-screen bg-greyLight flex items-center justify-center">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Anda Belum Login</h1>
        <Link to="/" className="bg-light p-2 rounded text-lg text-center">
          kembali
        </Link>
        <Link to="/login" className="bg-secondary p-2 rounded text-lg text-center">
          Login
        </Link>
      </div>
    </div>
  );
}

export default NotLogin;
