import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import axios from "axios";
import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users`)
      .then((res) => {
        if (res.data.status === "success") {
          setUsers(res.data.users);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handlerDelete = (_id) => {
    if (confirm(`Apakah anda yaking ingin menghapus user ?`)) {
      axios
        .delete(`${import.meta.env.VITE_BASE_URL}/user/${_id}`)
        .then((res) => {
          console.log(res.data);
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
      {/* <table className="w-full border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 text-2xl p-2">Nama</th>
            <th className="border border-slate-600 text-2xl p-2">Role</th>
            <th className="border border-slate-600 text-2xl p-2 w-64">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td className="border border-slate-700 p-4 text-xl">{user.username}</td>
                <td className="border border-slate-700 p-4 text-xl">{user.role}</td>
                <td className="border border-slate-700 text-xl text-center">
                  <Link
                    to={`/admin/edit-product/${user._id}`}
                    className="py-2 px-4 bg-primary mr-4 text-light"
                  >
                    Edit
                  </Link>
                  <button
                    className="py-2 px-4 bg-secondary text-light"
                    onClick={() => handlerDelete(user._id)}
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
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="capitalize" style={{ fontSize: "1.3rem" }}>
                username
              </StyledTableCell>
              <StyledTableCell align="right" className="capitalize" style={{ fontSize: "1.3rem" }}>
                role
              </StyledTableCell>
              <StyledTableCell align="right" className="capitalize" style={{ fontSize: "1.3rem" }}>
                aksi
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell style={{ fontSize: "1.2rem" }}>{user.username}</StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="right">
                  {user.role}
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "1.2rem" }} align="right">
                  <button
                    className="py-2 px-4 bg-secondary text-light"
                    onClick={() => handlerDelete(user._id)}
                  >
                    Delete
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Users;
