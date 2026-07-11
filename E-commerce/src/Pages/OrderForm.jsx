import React from "react";
import { Input, Button } from "../export";
import { useForm } from "react-hook-form";

const OrderForm = ({ placeOrder }) => {
  const inputClass =
    "w-full h-9 rounded-md border border-solid border-gray-300 pl-3 outline-none";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-[45%] max-sm:w-full mt-5 max-sm:mt-2">
      <form onSubmit={handleSubmit(placeOrder)} className="flex flex-col gap-4">
        <div className="w-full flex gap-4 max-sm:flex-col">
          <Input
            wrapperClassName="w-1/2 max-sm:w-full"
            className={inputClass}
            placeholder="First name"
            error={errors.firstName?.message}
            {...register("firstName", { required: "First name is required" })}
          />
          <Input
            wrapperClassName="w-1/2 max-sm:w-full"
            className={inputClass}
            placeholder="Last name"
            error={errors.lastName?.message}
            {...register("lastName", { required: "Last name is required" })}
          />
        </div>

        <Input
          className={inputClass}
          placeholder="Email address"
          type="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />

        <Input
          className={inputClass}
          placeholder="Street"
          error={errors.street?.message}
          {...register("street", { required: "Street is required" })}
        />

        <div className="w-full flex gap-4 max-sm:flex-col">
          <Input
            wrapperClassName="w-1/2 max-sm:w-full"
            className={inputClass}
            placeholder="City"
            error={errors.city?.message}
            {...register("city", { required: "City is required" })}
          />
          <Input
            wrapperClassName="w-1/2 max-sm:w-full"
            className={inputClass}
            placeholder="State"
            error={errors.state?.message}
            {...register("state", { required: "State is required" })}
          />
        </div>

        <div className="w-full flex gap-4 max-sm:flex-col">
          <Input
            wrapperClassName="w-1/2 max-sm:w-full"
            className={inputClass}
            placeholder="Zipcode"
            error={errors.zipcode?.message}
            {...register("zipcode", { required: "Zipcode is required" })}
          />
          <Input
            wrapperClassName="w-1/2 max-sm:w-full"
            className={inputClass}
            placeholder="Country"
            error={errors.country?.message}
            {...register("country", { required: "Country is required" })}
          />
        </div>

        <Input
          className={inputClass}
          placeholder="Phone"
          type="tel"
          error={errors.phone?.message}
          {...register("phone", { required: "Phone is required" })}
        />

        <Button
          type="submit"
          className="w-48 h-9 mt-3 bg-black text-white text-base rounded-md max-sm:w-full max-sm:text-[13px]"
        >
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default OrderForm;
