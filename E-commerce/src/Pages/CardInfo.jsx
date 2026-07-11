import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Starlogo,
  QuantityBtn,
  PolicyCard,
  ReviewPage,
  ReletedProducts,
  Loader,
} from "../export";
import { TbTruckReturn, TbRulerMeasure, TbTag, TbTruckDelivery } from "react-icons/tb";
import { GiShakingHands } from "react-icons/gi";
import { AiOutlineGift, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useSelector } from "react-redux";
import dataBaseService from "../appwrite/cart";
import productService from "../appwrite/product";
const CardInfo = () => {
  const { Quantity } = useSelector((state) => state.allProducts);
  const { userData } = useSelector((state) => state.authSlice);
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardInfo, setCardInfo] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // fetch card information using product id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productService.getProduct(id);
        setCardInfo(response);
        setImgIndex(0);
        setSelectedSize("");
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  // make add to card funcationalty
  const addToCart = async () => {
    if (!userData || !userData.$id) {
      toast.error('Please login to add products to cart');
      return;
    }
    const quantity = Quantity[id] || 1
    try {
      await dataBaseService.addToCart(
        {
          userId: userData.$id,
          productId: String(cardInfo.$id || cardInfo.id),
          title: String(cardInfo.productName || cardInfo.title),
          image: String(cardInfo.images[0]),
          price: Math.round(cardInfo.sellingPrice || cardInfo.price),
          quantity: Number(Quantity[id] || 1),
          size: selectedSize || (cleanSizes.length > 0 ? cleanSizes[0] : ""),

        }).then((res) => {
          if (res) {
            toast.success('Product added to cart');
            navigate('/cart');
          }
        })
    } catch (error) {
      console.log(error);
      toast.error(error?.message || 'Error: Product not added');
    }

  };

  let cleanSizes = [];
  if (cardInfo?.sizes) {
    let sizesArray = Array.isArray(cardInfo.sizes) ? cardInfo.sizes : [cardInfo.sizes];
    if (sizesArray.length === 1 && typeof sizesArray[0] === 'string' && sizesArray[0].includes(',')) {
      sizesArray = sizesArray[0].split(',');
    }
    cleanSizes = sizesArray.map(s => s.replace(/[{}"'[\]]/g, '').trim()).filter(Boolean);
  }

  return (
    <>
      {cardInfo ? (
        <div>
          <div className="w-4/5 max-w-[1500px] max-lg:w-11/12 max-sm:w-full  m-auto max-sm:flex-col flex items-start gap-5">
            <div className="w-1/2 max-sm:w-full max-lg:h-full  flex max-sm:gap-5  max-sm:flex-col-reverse max-sm:items-center max-sm:mb-5 sticky top-24">
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

            <div className="w-1/2 max-sm:w-full px-5 lg:px-8 flex flex-col justify-start">
              <div className="w-full flex items-center justify-between mb-3 mt-2">
                <span className="bg-black text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                  New
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  {cardInfo.availabilityStatus || (cardInfo.inventory > 0 ? "In Stock" : "Out of Stock")}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">{cardInfo.productName || cardInfo.title}</h1>
              <div className="flex gap-3 items-center mb-6">
                <span className="text-xl font-medium text-gray-800">
                  Rs. {cardInfo.sellingPrice?.toFixed ? cardInfo.sellingPrice.toFixed(2) : cardInfo.sellingPrice}
                </span>
                {cardInfo.productPrice && (
                   <span className="text-base text-gray-500 line-through">
                     Rs. {cardInfo.productPrice?.toFixed ? cardInfo.productPrice.toFixed(2) : cardInfo.productPrice}
                   </span>
                )}
              </div>
              
              {cleanSizes.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-600 text-sm">Size : {selectedSize || cleanSizes[0]}</span>
                    <span className="text-black font-semibold text-sm">| Refer the size guide for your best fit.</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cleanSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-11 h-11 flex items-center justify-center text-sm ${
                          (selectedSize || cleanSizes[0]) === size
                            ? "border-[1.5px] border-black font-semibold text-black"
                            : "border border-gray-200 text-gray-500 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-gray-500 hover:text-black cursor-pointer w-max">
                    <TbRulerMeasure className="text-lg" />
                    <span className="underline underline-offset-4 decoration-gray-400 text-sm">Size Guide</span>
                  </div>
                </div>
              )}

              <div className="w-full flex flex-wrap gap-3 items-center mb-8">
                <QuantityBtn id={id} />
                <button
                  onClick={() => {
                    addToCart();
                  }}
                  className="border border-black text-black bg-white hover:bg-black hover:text-white px-6 h-11 rounded-full text-xs font-bold tracking-widest transition-colors flex-1 min-w-[130px]"
                >
                  ADD TO CART
                </button>
                <button className="bg-[#1c1b1b] hover:bg-black text-white px-6 h-11 rounded-full text-xs font-bold tracking-widest transition-colors flex-1 min-w-[130px]">
                  BUY NOW
                </button>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-8 font-light">
                <span className="italic font-medium">{cardInfo.productName || cardInfo.title}</span> {cardInfo.description}
              </p>

              <div className="w-full border-t border-gray-200">
                <div className="border-b border-gray-200">
                  <button 
                    onClick={() => toggleAccordion('washcare')}
                    className="w-full py-4 flex justify-between items-center text-left"
                  >
                    <div className="flex items-center gap-3 text-gray-700">
                      <TbTag className="text-lg" />
                      <span className="text-sm font-medium">Washcare</span>
                    </div>
                    {openAccordion === 'washcare' ? <AiOutlineMinus className="text-base text-gray-500"/> : <AiOutlinePlus className="text-base text-gray-500"/>}
                  </button>
                  {openAccordion === 'washcare' && (
                    <div className="pb-4 text-gray-500 text-sm">
                      Machine wash cold. Do not bleach. Tumble dry low.
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-200">
                  <button 
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full py-4 flex justify-between items-center text-left"
                  >
                    <div className="flex items-center gap-3 text-gray-700">
                      <TbTruckDelivery className="text-lg" />
                      <span className="text-sm font-medium">Shipping</span>
                    </div>
                    {openAccordion === 'shipping' ? <AiOutlineMinus className="text-base text-gray-500"/> : <AiOutlinePlus className="text-base text-gray-500"/>}
                  </button>
                  {openAccordion === 'shipping' && (
                    <div className="pb-4 text-gray-500 text-sm">
                      Free shipping on all orders over Rs. 2000. Ships within 3-5 business days.
                    </div>
                  )}
                </div>

                <div className="border-b border-gray-200">
                  <button 
                    onClick={() => toggleAccordion('discounts')}
                    className="w-full py-4 flex justify-between items-center text-left"
                  >
                    <div className="flex items-center gap-3 text-gray-700">
                      <AiOutlineGift className="text-lg" />
                      <span className="text-sm font-medium">Discounts</span>
                    </div>
                    {openAccordion === 'discounts' ? <AiOutlineMinus className="text-base text-gray-500"/> : <AiOutlinePlus className="text-base text-gray-500"/>}
                  </button>
                  {openAccordion === 'discounts' && (
                    <div className="pb-4 flex flex-col gap-3">
                      <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-3">
                        <AiOutlineGift className="text-xl text-gray-600" />
                        <span className="text-gray-500 text-xs">Get <span className="text-green-600 font-bold">15% OFF</span> on prepaid orders above ₹5000</span>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-3">
                        <AiOutlineGift className="text-xl text-gray-600" />
                        <span className="text-gray-500 text-xs">Get <span className="text-green-600 font-bold">20% OFF</span> on prepaid orders above ₹10000</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/5 max-lg:w-11/12 flex justify-evenly max-sm:flex-wrap  mt-14 m-auto">
            <PolicyCard
              text1={cardInfo.returnPolicy || "30 days return policy"}
              icon={<TbTruckReturn />}
            />
            <PolicyCard text1={cardInfo.shippingInformation || "Ships in 3-5 days"} />
            <PolicyCard
              text1={cardInfo.warrantyInformation || "1 year warranty"}
              icon={<GiShakingHands />}
            />
          </div>
          <ReletedProducts category={cardInfo.category} subCategory={cardInfo.subCategory} currentProductId={cardInfo.$id || id} />
          {cardInfo.reviews && <ReviewPage reviews={cardInfo.reviews} />}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CardInfo;
