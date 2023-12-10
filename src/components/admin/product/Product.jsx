import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/product`)
      .then((res) => {
        if (res.data.status === "success") {
          setProducts(res.data.products);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handlerDelete = (_id) => {
    if (confirm(`Apakah anda yaking ingin menghapus product ?`)) {
      axios
        .delete(`${import.meta.env.VITE_BASE_URL}/product/${_id}`)
        .then((res) => {
          if (res.data.status === "success") {
            window.location.reload(true);
          } else {
            alert("error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="p-8">
      {/* <table className="border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 text-2xl p-2 w-96">Nama</th>
            <th className="border border-slate-600 text-2xl p-2">Tipe</th>
            <th className="border border-slate-600 text-2xl p-2">Harga</th>
            <th className="border border-slate-600 text-2xl p-2">Gambar</th>
            <th className="border border-slate-600 text-2xl p-2">Deskripsi</th>
            <th className="border border-slate-600 text-2xl p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td className="border border-slate-700 p-4 text-xl">{product.nama}</td>
                <td className="border border-slate-700 p-4 text-xl">{product.tipe}</td>
                <td className="border border-slate-700 p-4 text-xl">
                  {product.harga.toLocaleString("id-ID")}
                </td>
                <td className="border border-slate-700 p-4 text-xl">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/images/product/${product.image}`}
                    alt="image"
                    className="w-52"
                  />
                </td>
                <td className="border border-slate-700 p-4 text-xl">
                  <pre>{product.desc}</pre>
                </td>
                <td className="border border-slate-700 text-xl text-center">
                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="py-2 px-4 bg-primary mr-4 text-light"
                  >
                    Edit
                  </Link>
                  <button
                    className="py-2 px-4 bg-secondary text-light"
                    onClick={() => handlerDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>nama</TableCell>
              <TableCell>tipe</TableCell>
              <TableCell>harga</TableCell>
              <TableCell>gambar</TableCell>
              <TableCell>deskrpisi</TableCell>
              <TableCell>aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{product.nama}</TableCell>
                <TableCell>{product.tipe}</TableCell>
                <TableCell>{product.harga.toLocaleString("id-ID")}</TableCell>
                <TableCell>
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/images/product/${product.image}`}
                    alt="product image"
                    className="w-64 aspect-square"
                  />
                </TableCell>
                <TableCell>{product.desc}</TableCell>
                <TableCell>
                  <div className="flex">
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      className="py-2 px-4 bg-primary mr-4 text-light"
                    >
                      Edit
                    </Link>
                    <button
                      className="py-2 px-4 bg-secondary text-light"
                      onClick={() => handlerDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Product;
