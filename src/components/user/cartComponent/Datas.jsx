import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CartDatas({ dataUsername }) {
  const [datas, setDatas] = useState([]);
  const [isChecked, setIschecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [hargaTotal, setHargaTotal] = useState(0);
  const [checkoutData, setCheckoutData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/cart`)
      .then((res) => {
        if (res.data.status === "success") {
          const data = res.data.cartDatas;

          const dataFiltered = data.filter((data) => data.username === dataUsername);

          // Initialize checkedState based on the fetched data
          const initialCheckedState = new Array(dataFiltered.length).fill(false);
          setCheckedItems(initialCheckedState);

          // Set the cart data
          setDatas(dataFiltered);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedItems.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedItems(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce((sum, currentState, index) => {
      if (currentState === true) {
        return sum + datas[index].hargaAkhir;
      }
      return sum;
    }, 0);
    setIschecked(!isChecked);
    setHargaTotal(totalPrice);

    const selectedIds = updatedCheckedState.reduce((selectedIds, currentState, index) => {
      if (currentState === true) {
        return [...selectedIds, datas[index]];
      }
      return selectedIds;
    }, []);
    setCheckoutData(selectedIds);
  };
  function handlerDeleteCart(dataId) {
    axios
      .delete(`${import.meta.env.VITE_BASE_URL}/cart/${dataId}`)
      .then((res) => {
        if (res.data.status === "success") {
          window.location.reload();
        } else {
          alert("error");
        }
      })
      .catch((err) => console.log(err));
  }

  function handlerCheckout() {
    const config = {
      headers: { "content-type": "application/json" },
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/checkout`, checkoutData, config)
      .then((res) => {
        if (res.data.status === "success") {
          navigate("/checkout");
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="lg:px-20 px-2 flex flex-col gap-4 mt-4 relative">
      {datas.map((data, index) => {
        const dataId = data._id;
        const jumlahProduct = data.hargaAkhir / data.hargaAwal;
        return (
          <div key={index} className="bg-greyLight lg:p-4 p-2 flex gap-4 relative">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/images/product/${data.image}`}
              alt="product image"
              className="lg:w-40 w-1/4 aspect-square"
            />
            <button
              className="bg-red-500 lg:text-2xl lg:px-4 absolute lg:top-4 lg:right-4 top-0 right-0 px-2 text-xl"
              onClick={() => handlerDeleteCart(dataId)}
            >
              -
            </button>
            <div className="flex flex-col justify-between gap-4 py-4">
              <div>
                <h1 className="lg:text-2xl">
                  {data.nama}
                  <span className="italic"> X {jumlahProduct}</span>
                </h1>
                <p className="lg:text-2xl">{data.hargaAwal.toLocaleString("id-ID")}</p>
              </div>
            </div>
            <div className="absolute lg:bottom-4 lg:right-4 lg:w-10 lg:h-10 bottom-2 right-2 w-5 h-5">
              <input
                type="checkbox"
                className="w-full h-full bg-transparent"
                checked={checkedItems[index]}
                onChange={() => handleOnChange(index)}
              />
            </div>
          </div>
        );
      })}
      <div className="sticky w-full left-0 bottom-0">
        <div className="bg-primary w-full flex items-center justify-between">
          <h1 className="lg:text-2xl text-light ml-4">Total:</h1>
          <p className="lg:text-2xl text-light">{hargaTotal.toLocaleString("id-ID")}</p>
          <button
            className="lg:text-2xl bg-secondary px-2 py-4 lg:p-4 lg:py-8 text-light font-bold"
            onClick={handlerCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDatas;
