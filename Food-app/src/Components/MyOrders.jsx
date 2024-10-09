import { useDispatch, useSelector } from "react-redux";
import { handleOrderCancel } from "../Store/orders";
const MyOrders = () => {
  const {orderedItem , orderQuantity} = useSelector(state => state.orders)
  const {orderDetails} = useSelector(state => state.orderDetails)
  const dispatch = useDispatch()
  const cancelOrder = (index) => {
    console.log("click");
    alert('order cancel')
       dispatch(handleOrderCancel(index))
  }
  return (
    <div
      style={{ minHeight: "calc(100vh - 4rem)" }}
      className="w-5/6 m-auto   "
    >
      <div className="w-full  m-auto flex flex-col gap-2 mt-10 ">
        <h1 className="text-2xl font-medium ">My Orders</h1>
          <div className="w-full h-12 flex justify-start gap-[68px] items-center text-sm text-gray-500 border-b border-b-gray-300">
            <span className="w-32  text-center">Items</span>
            <span className="w-32  text-center">Tittle</span>
            <span className="w-32  text-center">Quantity</span>
            <span className="w-32  text-center">Price</span>
            <span className="w-32  text-center">Status</span>
            <span className="w-32  text-center">Cancel</span>
          </div>
      
        {Object.keys(orderDetails).length === 0 ? (
            <p className="text-center text-gray-500 capitalize">
              item not found
            </p>
          ) : (
            orderedItem.map((item , index) => (
              <div key={index} className="w-full h-16 flex justify-start gap-24 items-center text-sm font-medium border border-gray-300 mt-3 pr-3 ">
              <div className="w-32  flex justify-center max-sm:font-normal">
                <img
                  className="w-10 h-10 max-sm:w-8 max-sm:h-8 "
                  src={item.img}
                  alt="img"
                />
              </div>
              <span className="w-32  text-center max-sm:font-normal">
              {item.name}
              </span>
              <span className="  text-center max-sm:font-normal">
                {" "}
                <span>Quantity : {orderQuantity[index].value} * {item.price}</span>
              </span>
              <span className="text-center max-sm:font-normal"> $ {orderQuantity[index].value * item.price}</span>
              <span className=" text-center max-sm:font-normal">
                <span className="text-[8px]">{orderQuantity[index].status !== 'Food Processing'  ? "🟢" : "🔴"} </span>{orderQuantity[index].status}
              </span>
              <button onClick={() => {cancelOrder(index)}} className={`w-28 text-gray-800 h-10 rounded-md bg-red-300 ${orderQuantity[index].status === 'Cancelled' ? 'hidden' : 'block'} `}>
                 Order Cancel
              </button>
            </div>
            ))
          )}
        


      </div>
    </div>
  );
};

export default MyOrders;
