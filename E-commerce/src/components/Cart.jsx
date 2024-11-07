import React, { memo, useEffect, useState } from "react";
import { Loader } from "../export";
import { MdDelete } from "react-icons/md";
import dataBaseService from "../appwrite/cart";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCartItem } from "../Store/addToCart";
const Cart = ({ item, Id }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authSlice);
  const [loader, setLoader] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleQuantity = (Quantity) => {
    setLoader(true);
    const total = Quantity * Number(item.Price);
    dataBaseService
      .updateCart({
        Quantity: Number(Quantity),
        Total: Number(total),
        Id: Id,
      })
      .then((response) => {
        setUpdatedItem(response);
        dataBaseService
          .getCarts(userData.$id)
          .then((res) => {
            dispatch(addToCartItem(res.documents));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => toast.error("Error!!!!!"))
      .finally(() => setLoader(false));
  };
  
  const deleteItem = () => {
    setLoader(true);
    dataBaseService.deleteCart(Id).then((res) => {
      if (res) {
        dataBaseService
          .getCarts(userData.$id)
          .then((res) => {
            dispatch(addToCartItem(res.documents));
          })
          .catch((error) => console.log(error))
          .finally(() => setLoader(false));
        toast.success("Item Deleted successfully");
      } else {
        toast.error("ERROR");
      }
    });
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="w-full h-20 flex items-center justify-between border-t border-solid border-gray-300 p-5 max-sm:p-0 text-sm">
          <div className=" h-16 flex gap-5 max-sm:gap-2 items-center ">
            <img className="w-16 h-16" src={updatedItem.Image} alt="" />
            <div className="flex gap-20 max-sm:flex-col max-sm:gap-2">
          <span className="text-sm  ">{updatedItem.Tittle}</span>
          <span>$ {updatedItem.Price}</span>
            </div>
          </div>
        
            <input
              onChange={(e) => {
                handleQuantity(e.target.value);
              }}
              className=" w-16 border border-solid border-gray-500 outline-none pl-5 max-sm:w-12 max-sm:pl-3 "
              type="number"
              value={updatedItem.Quantity}
              min={1}
              max={10}
            />
         
          <span>$ {updatedItem.Total}</span>
          <button
            onClick={() => {
              deleteItem();
            }}
          >
            <MdDelete className="text-2xl text-red-500" />
          </button>
        </div>
      )}
    </>
  );
};

export default memo(Cart);
