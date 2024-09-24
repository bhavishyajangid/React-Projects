import React from 'react'
import robert from "../assets/robert.png";
const Card = () => {
  return (
    <div className="w-full sm:w-[450px] px-7 py-8 bg-[#fff] rounded-xl flex-shrink-0 max-[450px]:w-full max-sm:px-5 max-sm:py-5">
    <div className="w-full min-h-24 flex">
      <img className="w-16 h-16 rounded-lg" src={robert} alt="" />
      <div className="w-full h-24 px-5 max-sm:pl-5 max-sm:px-0 ">
        <h2 className="text-2xl font-semibold max-[400px]:text-xl">Robert A. Voltaire</h2>
        <h3 className="font-medium text-[#18C75A]">Store link</h3>
        <span>⭐⭐⭐⭐</span>
      </div>
    </div>
    <p className="text-left text-[#485256] font-sans">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, earum
      accusamus magni omnis laborum minima quas esse aliquid aliquam eveniet
      autem fugiat molestias itaque dolor, labore natus eaque obcaecati
      architecto numquam quaerat,
    </p>
  </div>

  )
}

export default Card