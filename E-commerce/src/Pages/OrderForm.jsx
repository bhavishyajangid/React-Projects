import React from "react";
import { Input, Button } from "../export";
import { useForm } from "react-hook-form";
const OrderForm = ({ placeOrder }) => {
  const inputClass =
    " h-9 rounded-md border border-solid border-gray-300 pl-3 outline-none";
  const { register, handleSubmit } = useForm();

  return (
    <div className="w-[45%] max-sm:w-full   mt-5 max-sm:mt-2 ">
      <form onSubmit={handleSubmit(placeOrder)} className="flex flex-col gap-4">
        <div className="w-full flex gap-4">
          <Input
            className={`w-[50%] ${inputClass}`}
            placeholder={"First name"}
            {...register("first name", {
              required: true,
            })}
          />

          <Input
            className={`w-[50%] ${inputClass}`}
            placeholder={"Last name"}
            {...register("last name", {
              required: true,
            })}
          />
        </div>
        <Input
          className={`w-full h-9 ${inputClass}`}
          placeholder={"Email address"}
          type={"email"}
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />

        <Input
          className={`w-full h-9 ${inputClass}`}
          placeholder={"Street"}
          {...register("street", {
            required: true,
          })}
        />

        <div className="w-full flex gap-4">
          <Input
            className={`w-[50%] ${inputClass}`}
            placeholder={"City"}
            {...register("city", {
              required: true,
            })}
          />
          <Input
            className={`w-[50%] ${inputClass}`}
            placeholder={"State"}
            {...register("state", {
              required: true,
            })}
          />
        </div>
        <div className="w-full flex gap-4">
          <Input
            className={`w-[50%] ${inputClass}`}
            placeholder={"Zipcode"}
            type={"zipcode"}
            {...register("password", {
              required: true,
            })}
          />
          <Input
            className={`w-[50%] ${inputClass}`}
            placeholder={"Country"}
            {...register("country", {
              required: true,
            })}
          />
        </div>
        <Input
          className={`w-full h-9 ${inputClass}`}
          placeholder={"Phone"}
          type={"number"}
          {...register("number", {
            required: true,
          })}
        />
        <Button
          type="submit"
          className="w-48   h-9 mt-7 bg-black text-white text-base rounded-md max-sm:w-[50%] max-sm:text-[13px] "
        >
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default OrderForm;
