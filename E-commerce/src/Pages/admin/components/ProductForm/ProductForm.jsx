import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Textarea, Select, Checkbox } from "../../../../export";
import ImageUploadGrid from "./ImageUploadGrid";
import SizeSelector from "./SizeSelector";
import {
  productDefaultValues,
  productValidation,
} from "./productFormSchema";
import {
  PRODUCT_CATEGORIES,
  CATEGORY_OPTIONS,
} from "../../constants/productCategories";

const inputClass =
  "w-full h-10 border border-gray-300 rounded outline-none px-3 text-sm transition-all focus:border-black focus:ring-1 focus:ring-black placeholder:text-gray-400";
const textareaClass =
  "w-full border border-gray-300 rounded outline-none px-3 py-2 text-sm transition-all focus:border-black focus:ring-1 focus:ring-black placeholder:text-gray-400 resize-none";
const selectClass =
  "w-full h-10 border border-gray-300 rounded outline-none px-3 text-sm bg-white transition-all focus:border-black focus:ring-1 focus:ring-black text-gray-700 cursor-pointer disabled:bg-gray-50 disabled:text-gray-400";

const ProductForm = ({
  mode = "add",
  defaultValues: editValues,
  onSubmit,
}) => {
  // Ensure images is always an array, even if editValues is malformed
  const safeEditValues = {
    ...editValues,
    images: Array.isArray(editValues?.images) ? editValues.images : [null, null, null, null]
  };

  const initialValues = {
    ...productDefaultValues,
    ...safeEditValues,
    sellingPrice: editValues?.sellingPrice ?? editValues?.price ?? "",
    productPrice: editValues?.productPrice ?? editValues?.price ?? "",
    inventory: editValues?.inventory ?? "",
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const handleFormSubmit = async (data) => {
    const success = await onSubmit({
      ...data,
      price: data.sellingPrice,
    });
    if (success && mode === "add") {
      reset(productDefaultValues);
    }
  };

  const selectedCategory = watch("category");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setValue("subCategory", "");
  }, [selectedCategory, setValue]);

  const subCategoryOptions = selectedCategory
    ? PRODUCT_CATEGORIES[selectedCategory]
    : [];

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-6 max-w-2xl bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
    >
      <Controller
        name="images"
        control={control}
        rules={productValidation.images}
        render={({ field }) => (
          <ImageUploadGrid
            value={field.value}
            onChange={field.onChange}
            error={errors.images?.message}
          />
        )}
      />

      <Input
        label="Product name"
        className={inputClass}
        placeholder="Type here"
        error={errors.name?.message}
        {...register("productName", productValidation.productName)}
      />

      <Textarea
        label="Product description"
        className={textareaClass}
        placeholder="Write content here"
        rows={4}
        error={errors.description?.message}
        {...register("description", productValidation.description)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <Select
          label="Product category"
          className={selectClass}
          placeholder="Select category"
          options={CATEGORY_OPTIONS}
          error={errors.category?.message}
          {...register("category", productValidation.category)}
        />

        <Select
          label="Sub category"
          className={selectClass}
          placeholder="Select sub category"
          options={subCategoryOptions}
          disabled={!selectedCategory}
          error={errors.subCategory?.message}
          {...register("subCategory", productValidation.subCategory)}
        />

        <Input
          label="Selling Price"
          type="number"
          min={1}
          className={inputClass}
          placeholder="25"
          error={errors.sellingPrice?.message}
          {...register("sellingPrice", {
            ...productValidation.sellingPrice,
            valueAsNumber: true,
            onChange: () => trigger("sellingPrice"),
            validate: {
              ...(typeof productValidation.sellingPrice.validate === 'function'
                ? { notNaN: productValidation.sellingPrice.validate }
                : productValidation.sellingPrice.validate),
              notGreaterThanProductPrice: (value) => {
                const productPrice = getValues("productPrice");
                if (isNaN(value) || isNaN(productPrice)) return true;
                return value <= productPrice || "Selling price cannot be greater than product price";
              },
            },
          })}
        />

        <Input
          label="Product Price"
          type="number"
          min={1}
          className={inputClass}
          placeholder="25"
          error={errors.productPrice?.message}
          {...register("productPrice", {
            ...productValidation.productPrice,
            valueAsNumber: true,
            onChange: () => trigger("sellingPrice"),
          })}
        />
      </div>

      <Controller
        name="sizes"
        control={control}
        rules={productValidation.sizes}
        render={({ field }) => (
          <SizeSelector
            value={field.value}
            onChange={field.onChange}
            error={errors.sizes?.message}
          />
        )}
      />

      <Input
        label="Inventory"
        type="number"
        min={0}
        className={inputClass}
        placeholder="25"
        error={errors.inventory?.message}
        {...register("inventory", { ...productValidation.inventory, valueAsNumber: true })}
      />

      <Checkbox
        label="Add to bestseller"
        className="w-4 h-4 text-black border-gray-300 rounded cursor-pointer accent-black focus:ring-black"
        {...register("bestseller")}
      />

      <Button
        type="submit"
        className="w-36 h-10 bg-black text-white hover:bg-gray-800 transition-colors font-medium active:scale-95 text-sm uppercase"
      >
        {mode === "add" ? "ADD" : "UPDATE"}
      </Button>
    </form>
  );
};

export default ProductForm;