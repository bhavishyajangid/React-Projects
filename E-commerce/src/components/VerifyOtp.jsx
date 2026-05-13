import React from 'react'
import Input from './Input'

const VerifyOtp = () => {
   
let option = {
      id: "otp",
        label: "otp",
        placeholder: "Enter your otp",
        type: "text",
        registerOptions: {
            required: "Otp is required",
            validate : {
                matchPatern : (value) => /^\d{6}$/.test(value) || "Otp must be a 6 digit number"
            }
        },
    }

  return (
    <div>
       <Input
                 id={option.id}
                 label={option.label}
                 error={errors[option.label] && errors[option.label].message}
                className="w-96 h-10 border border-black border-solid outline-none px-2 placeholder:text-sm"
                placeholder={option.placeholder}
                type={option.type}
                {...register(option.label, option.registerOptions)}
        />
    </div>
  )
}

export default VerifyOtp