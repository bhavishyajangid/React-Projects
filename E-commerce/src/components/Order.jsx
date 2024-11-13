import { useState } from "react";
import OrderServices from "../appwrite/orders"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { setAllOrders } from "../Store/orders";
const Order = ({order}) => {
  const {userData} = useSelector(state => state.authSlice);
    const [loader , setLoader] = useState(false);
    const dispatch = useDispatch()

  const cancelOrder = (Id) => {
    setLoader(true);
    OrderServices.cancelOrder(Id).then((res) => {
      if (res) {
        OrderServices.getOrders(userData.$id)
        .then((res) => {
             dispatch(setAllOrders(res.documents))
        }).finally(() => setLoader(false));
        toast.success("Order Cancelled successfully");
      } else {
        toast.error(" TECHINICAL ERROR");
      }
    });
  };
   
  return (
    <>
    {
      loader ? <Loader/> :  <div className="py-2 border-t border-b text-gray-700 flex  flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-start gap-6 text-sm">
        <img className="w-16 sm:w-20" src={order.Image} alt="" />
        <div>
          <p className="sm:text-base font-medium">{order.Tittle}</p>
          <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
            <p>Price : ${order.Price}</p>
            <p>Quantity: {order.Quantity}</p>
            </div>
            <p className="mt-1">Date: <span className=" text-gray-400">{order.Date}</span></p>
            <p className="mt-1">Payment: <span className=" text-gray-400">{order.Method}</span></p>
            </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
            <div className="flex items-center gap-2">
              <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
              <p className="text-sm md:text-base">{order.Status}</p>
              </div>
              <button
              onClick={() => {cancelOrder(order.Id)}} className="border px-4 py-2 text-sm font-medium rounded-sm">Cancel Order</button>
              </div>
              </div>
    }
    </>
  )
}

export default Order