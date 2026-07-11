import React, { memo, useEffect, useState } from "react";
import { Loader } from "../export";
import { MdDelete } from "react-icons/md";
import dataBaseService from "../appwrite/cart";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCartItem, updateCartItemQuantity } from "../Store/addToCart";
const Cart = ({ item, Id }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authSlice);
  const [loader, setLoader] = useState(false);
  // Initialize state with default values to prevent undefined property access
  const [updatedItem, setUpdatedItem] = useState({
    image: "",
    title: "",
    price: 0,
    quantity: 1,
  });

  // Update state when item prop changes
  useEffect(() => {
    if (item) {
      setUpdatedItem(item);
    }
  }, [item]);

  const handleQuantity = (quantity) => {
    const newQuantity = Number(quantity);
    
    // Optimistically update local state
    setUpdatedItem((prev) => ({ ...prev, quantity: newQuantity }));
    
    // Optimistically update Redux store to keep totals in sync immediately
    dispatch(updateCartItemQuantity({ id: Id, quantity: newQuantity }));

    // Silently update database in the background without loaders
    dataBaseService
      .updateCart({
        quantity: newQuantity,
        Id: Id,
      })
      .catch(() => toast.error("Error updating quantity"));
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
        <div className="w-full py-4 grid grid-cols-[2fr_1fr_1fr_1fr_auto] max-sm:grid-cols-[2fr_auto_auto] items-center gap-4 border-b border-solid border-gray-200 px-5 max-sm:px-2 text-sm hover:bg-gray-50 transition-colors">
          
          {/* Product Details */}
          <div className="flex items-center gap-4">
            <img className="w-16 h-16 object-cover rounded-md border border-gray-100" src={updatedItem.image} alt={updatedItem.title} />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-gray-800 line-clamp-2">{updatedItem.title}</span>
              {updatedItem.size && <span className="text-xs text-gray-500">Size: {updatedItem.size}</span>}
              <span className="text-sm sm:hidden text-gray-600 font-medium mt-1">$ {updatedItem.price}</span>
            </div>
          </div>

          {/* Price (Hidden on small screens) */}
          <div className="hidden sm:block text-gray-600 font-medium">
            $ {updatedItem.price}
          </div>

          {/* Quantity */}
          <div>
            <input
              onChange={(e) => {
                handleQuantity(e.target.value);
              }}
              className="w-16 h-9 border border-gray-300 rounded outline-none px-2 text-center text-sm focus:border-black transition-colors"
              type="number"
              value={updatedItem.quantity}
              min={1}
              max={10}
            />
          </div>

          {/* Total */}
          <div className="font-semibold text-gray-900">
            $ {updatedItem.price * updatedItem.quantity}
          </div>

          {/* Delete Action */}
          <button
            onClick={() => {
              deleteItem();
            }}
            className="text-gray-400 hover:text-red-500 transition-colors p-2"
          >
            <MdDelete className="text-xl" />
          </button>

        </div>
      )}
    </>
  );
};

export default memo(Cart);