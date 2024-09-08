import { createContext, useEffect, useState } from "react";
import FoodData from "../../FoodData/FoodData";
import { AllCatogries } from "../../FoodData/FoodData";
import { Result } from "postcss";

// Create the context with default values
export const AllListContext = createContext({
  quantity: {},
  setQuantity: () => {},
  AllFoodData: [],
  AllCatogries: [],
  filterByCatogries: () => {},
  addToCart: () => {},
  setAddToCartItem: () => {},
  addToCartItem : [],
  setDiscount: () =>{},
  sub: () =>{},
  discount : {} ,
  userOrderDetails : {} ,
  setUserOrderDetails : () =>{} ,

});

const AllListContextProvider = ({ children }) => {
  // Manage quantities as an object where keys are item IDs and values are quantities
  const [AllFoodData, setAllFoodData] = useState(FoodData);
  const [quantity, setQuantity] = useState({});
  const [addToCartItem, setAddToCartItem] = useState([]);
  const[discount , setDiscount] = useState(0)
  const [userOrderDetails , setUserOrderDetails] = useState()
 

  const filterByCatogries = (filterCatogries) => {
    if (filterCatogries === "All") {
      setAllFoodData(FoodData);
    } else {
      const filteredData = FoodData.filter(
        (item) => item.category === filterCatogries
      );
      setAllFoodData(filteredData);
    }
  };

  const addToCart = () => {
    const obj = Object.fromEntries(
      Object.entries(quantity).filter(([key, value]) => value !== 0)
    );

    const keys = Object.keys(obj);
   
    const result = keys.map((item) => 
       FoodData.filter((item2) => item2.id == item)
    );

    setAddToCartItem(result.flat());

    
  };



  useEffect(() => {
    addToCart(); 
  }, [quantity]);

  return (
    <AllListContext.Provider
      value={{
        quantity,
        setQuantity,
        AllFoodData,
        AllCatogries,
        filterByCatogries,
        addToCart,
        addToCartItem,
        setAddToCartItem, 
        discount , 
        setDiscount, 
        userOrderDetails ,
        setUserOrderDetails
      }}
    >
      {children}
    </AllListContext.Provider>
  );
};

export default AllListContextProvider;
