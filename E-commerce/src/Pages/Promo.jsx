import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyPromo, removePromo } from '../Store/addToCart'
import { toast } from 'react-toastify'

const VALID_COUPONS = {
  'FUTURE20': { discountPercent: 20 }
};

const Promo = () => {
  const [promoInput, setPromoInput] = useState('')
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.authSlice)
  const { cartTotal } = useSelector(state => state.addToCart)

  const getUsedCouponsKey = () => {
    if (!userData?.$id) return null;
    return `usedCoupons_${userData.$id}`;
  };

  const isCouponUsed = (code) => {
    const key = getUsedCouponsKey();
    if (!key) return false;
    const used = JSON.parse(localStorage.getItem(key) || '[]');
    return used.includes(code.toUpperCase());
  };

  const handleSubmit = () => {
    const code = promoInput.trim().toUpperCase();

    if (!code) {
      toast.error('Please enter a promo code');
      return;
    }

    if (!userData?.$id) {
      toast.error('Please login to use promo codes');
      return;
    }

    if (cartTotal.promoApplied) {
      toast.error('A promo code is already applied');
      return;
    }

    const coupon = VALID_COUPONS[code];
    if (!coupon) {
      toast.error('Invalid promo code');
      return;
    }

    if (isCouponUsed(code)) {
      toast.error('You have already used this promo code');
      return;
    }

    dispatch(applyPromo({ code, discountPercent: coupon.discountPercent }));
    toast.success(`${code} applied! You get ${coupon.discountPercent}% off`);
    setPromoInput('');
  };

  const handleRemove = () => {
    dispatch(removePromo());
    toast.success('Promo code removed');
  };

  return (
    <div className="w-2/5 h-60 max-md:hidden">
      <p className="text-xs text-gray-500 mt-12">use FUTURE20 promo code for 20% discount</p>
      <p className="text-sm text-gray-500 mt-2">
        If you have a promo code. Enter it here
      </p>

      {cartTotal.promoApplied ? (
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-md">
            <span className="text-green-700 font-semibold text-sm">{cartTotal.promoCode}</span>
            <span className="text-green-600 text-xs">({cartTotal.discountPercent}% OFF)</span>
          </div>
          <button
            onClick={handleRemove}
            className="text-red-500 text-xs hover:text-red-700 underline underline-offset-2 transition-colors"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="w-full h-9 flex rounded-sm overflow-hidden mt-2">
          <input
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-[380px] bg-gray-200 text-sm pl-2 border-none outline-none max-lg:w-[350px]"
            type="text"
            placeholder="Enter promo code"
          />
          <button
            onClick={handleSubmit}
            className="w-[104px] bg-black text-white text-md max-lg:w-[130px] hover:bg-gray-800 transition-colors"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  )
}

export default Promo