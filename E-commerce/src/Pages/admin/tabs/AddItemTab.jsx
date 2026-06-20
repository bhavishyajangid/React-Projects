import React, { useCallback } from "react";
import ProductForm from "../components/ProductForm/ProductForm";
import { useAdminProducts } from "../../../hooks/useAdminProducts";
import LoaderOverlay from "../../../components/LoaderOverlay";

const AddItemTab = () => {
  const { createProduct, isLoading, loadingMessage } = useAdminProducts();

  const handleAddProduct = useCallback(async (data) => {
    return await createProduct(data);
  }, [createProduct]);

  return (
    <div>
      {isLoading && <LoaderOverlay message={loadingMessage} />}
      <h2 className="text-2xl text-[#414753] prata-regular mb-6">
        Add Items
        <span className="inline-block w-9 max-sm:h-[1.5px] h-[2px] bg-gray-900 ml-1"></span>
      </h2>
      <ProductForm mode="add" onSubmit={handleAddProduct} />
    </div>
  );
};

export default AddItemTab;
