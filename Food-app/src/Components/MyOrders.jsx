import { AiFillDelete } from "react-icons/ai";
import parcelimg from "../assets/orderimg.png";
import { AllListContext } from "./Context/AllListContext";
import { useContext , memo } from "react";
const MyOrders = () => {
  const { addToCartItem  , quantity , userOrderDetails } = useContext(AllListContext);
   console.log('my orders page');
   
  
  return (
    <div
      style={{ minHeight: "calc(100vh - 4rem)" }}
      className="w-5/6 m-auto   "
    >
      <div className="w-full  m-auto flex flex-col gap-2 mt-10 ">
        <h1 className="text-2xl font-medium">My Orders</h1>

      
        {userOrderDetails === undefined ? (
            <p className="text-center text-gray-500">
              no item found 
            </p>
          ) : (
            addToCartItem.map((item) => (
              <div className="w-full h-16 flex justify-between items-center text-sm font-medium border border-gray-300 mt-3 pr-3 ">
              <div className="w-32  flex justify-center max-sm:font-normal">
                <img
                  className="w-10 h-10 max-sm:w-8 max-sm:h-8 "
                  src={parcelimg}
                  alt="img"
                />
              </div>
              <span className="w-32  text-center max-sm:font-normal">
              {item.name}
              </span>
              <span className="  text-center max-sm:font-normal"> $ {item.price}</span>
              <span className="  text-center max-sm:font-normal">
                {" "}
                <span>item : {quantity[item.id]}</span>
              </span>
              <span className="  text-center max-sm:font-normal">
                <span className="text-[8px]">🔴</span> Food Processing
              </span>
              <button className="w-28 text-gray-800 h-10 rounded-md bg-red-300 ">
                Track Order
              </button>
            </div>
            ))
          )}
        


      </div>
    </div>
  );
};

export default MyOrders;
