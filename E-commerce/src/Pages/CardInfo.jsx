import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  toast } from "react-toastify";
import {
  Starlogo,
  QuantityBtn,
  PolicyCard,
  ReviewPage,
  ReletedProducts,
} from "../export";
import { TbTruckReturn } from "react-icons/tb";
import { GiShakingHands } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import dataBaseService from "../appwrite/cart";
const CardInfo = () => {
  const { Quantity } = useSelector((state) => state.allProducts);
  const { userData } = useSelector((state) => state.authSlice);
  const { id } = useParams();
  const [cardInfo, setCardInfo] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  // fetch card information using product id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const response = await res.json();
        setCardInfo(response);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [id]);
  
  // make add to card funcationalty
  const addToCart = async() => { 
    const quantity =  Quantity[id] || 1
    try {
      await dataBaseService.addToCart(
        {
          userId : userData.$id,
        Id : String(cardInfo.id) ,
        Tittle : String(cardInfo.title) ,
        Image : String(cardInfo.images[0]),
        Price : Math.round(cardInfo.price) ,
        Quantity : Number(Quantity[id] || 1) ,
        Total : Math.round(cardInfo.price * quantity),
      }).then((res) => {
          if(res) {
            toast.success('product is added into cart')
          }
      }) 
    } catch (error) {
      console.log(error);
      
        toast.error('ERROR : not added' );
    }
    
  };

  return (
    <>
      {cardInfo ? (
        <div>
          <div className="w-4/5 max-w-[1500px] max-lg:w-11/12 max-sm:w-full  m-auto max-sm:flex-col flex ">
            <div className="w-1/2 max-sm:w-full max-lg:h-full  flex max-sm:gap-5  max-sm:flex-col-reverse max-sm:items-center max-sm:mb-5">
              <div className="flex w-[25%] max-sm:w-full  flex-col gap-5 max-sm:flex-row max-sm:px-5">
                {cardInfo.images.map((item, index) => (
                  <img
                    onClick={() => {
                      setImgIndex(index);
                    }}
                    className="h-auto w-[80%] max-sm:w-[18%] cursor-pointer bg-gray-100"
                    key={index}
                    src={item}
                    alt="img"
                  />
                ))}
              </div>
              <img
                className="h-auto w-3/4 "
                src={cardInfo.images[imgIndex]}
                alt="img"
              />
            </div>

            <div className="w-1/2 max-sm:w-full   px-5 ">
              <div className="w-full flex items-center justify-between">
                <h1 className="text-xl ">{cardInfo.title}</h1>
                <span className="text-sm bg-green-300 px-2 py-1  rounded-md">
                  {cardInfo.availabilityStatus}
                </span>
              </div>
              <div className="w-full flex items-center gap-2 mt-2">
                <Starlogo />
                <span>({cardInfo.rating})</span>
              </div>
              <h2 className="text-2xl font-medium mt-7"> ${Math.round(cardInfo.price)}</h2>
              <p className="text-[15px] mt-4">{cardInfo.description}</p>
              <div className="w-full mt-8">
                <QuantityBtn id={id} />
              </div>
              <div className="w-full flex flex-wrap gap-5  justify-between items-center  mt-14 max-sm:justify-around">
                <button
                  onClick={() => {
                    addToCart();
                  }}
                  className="bg-black text-white px-8 h-10 rounded-md text-sm font-medium "
                >
                  ADD TO CART
                </button>
                <button className="bg-black text-white px-11 h-10 rounded-md text-sm font-medium mr-16 max-sm:mr-0 ">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
          <div className="w-4/5 max-lg:w-11/12 flex justify-evenly max-sm:flex-wrap  mt-14 m-auto">
            <PolicyCard
              text1={cardInfo.returnPolicy}
              icon={<TbTruckReturn />}
            />
            <PolicyCard text1={cardInfo.shippingInformation} />
            <PolicyCard
              text1={cardInfo.warrantyInformation}
              icon={<GiShakingHands />}
            />
          </div>
          <ReletedProducts category={cardInfo.category} />
          {cardInfo.reviews && <ReviewPage reviews={cardInfo.reviews} />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CardInfo;
