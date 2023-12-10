import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Product from "./components/admin/product/Product";
import EditProduct from "./components/admin/product/EditProduct";
import AddNewProduct from "./components/admin/product/AddNewProduct";
import Login from "./components/user/page/Login";
import Register from "./components/user/page/Register";
import AdminLogin from "./components/admin/AdminLogin";
import Homepage from "./components/user/page/Homepage";
import Detail from "./components/user/page/Detail";
import Users from "./components/admin/user/Users";
import Cart from "./components/user/page/Cart";
import Checkout from "./components/user/page/Checkout";
import Dashboard from "./components/admin/Dashboard";
import AddNewUser from "./components/admin/user/AddNewUser";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:_id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/loginAdmin" element={<AdminLogin />} />
        <Route path="admin" element={<Admin />}>
          <Route path="" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="add-new-user" element={<AddNewUser />} />
          <Route path="product" element={<Product />} />
          <Route path="add-new-product" element={<AddNewProduct />} />
          <Route path="edit-product/:_id" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
