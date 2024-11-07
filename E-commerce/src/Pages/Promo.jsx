import React from 'react'

const Promo = () => {
  return (
    <div className="w-2/5 h-60 max-md:hidden  ">
          <p className="text-xs text-gray-500 mt-12">use FUTURE20 promo code for 20% discount</p>
            <p className="text-sm text-gray-500 mt-2 ">
              If you have a promo code. Enter it here
            </p>
          
            <div className="w-full h-9  flex rounded-sm overflow-hidden">
              <input
                // ref={inputValue}
                className="w-[380px] bg-gray-200 text-sm  pl-2 border-none outline-none max-lg:w-[350px] "
                type="text"
                placeholder="Promo"
              />
              <button
                // onClick={handleSubmitBtn}
                className="w-[104px] bg-black text-white text-md max-lg:w-[130px] "
              >
                Submit
              </button>
            </div>
          </div>
  )
}

export default Promo