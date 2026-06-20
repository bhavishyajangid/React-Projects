export const productDefaultValues = {
  images: [null, null, null, null],
  productName: "",
  description: "",
  category: "",
  subCategory: "",
  sellingPrice: "",
  productPrice: "",
  inventory: "",
  sizes: [],
  bestseller: false,
};

export const productValidation = {
  productName: {
    required: "Product name is required",
  },
  description: {
    required: "Product description is required",
  },
  category: {
    required: "Product category is required",
  },
  subCategory: {
    required: "Sub category is required",
  },
  sellingPrice: {
    required: "Selling price is required",
    min: {
      value: 1,
      message: "Selling price must be at least 1",
    },
    validate: (value) => !isNaN(value) || "Selling price is required",
  },
  productPrice: {
    required: "Product price is required",
    min: {
      value: 1,
      message: "Product price must be at least 1",
    },
    validate: (value) => !isNaN(value) || "Product price is required",
  },
  inventory: {
    required: "Inventory is required",
    min: {
      value: 0,
      message: "Inventory cannot be negative",
    },
    validate: (value) => !isNaN(value) || "Inventory is required",
  },
  images: {
    validate: (value) =>
      value.some((img) => img !== null) || "At least one image is required",
  },
  sizes: {
    validate: (value) =>
      value.length > 0 || "At least one size is required",
  },
};

