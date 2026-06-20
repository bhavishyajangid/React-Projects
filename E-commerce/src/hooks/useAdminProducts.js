import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import productService from "../appwrite/product";
import {
  setAllProducts,
  addProduct as addProductAction,
  updateProductInState,
  deleteProductFromState,
} from "../Store/allproduct";
import { toast } from "react-toastify";

export const useAdminProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.allProducts || []);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const fetchProductsIfNeeded = useCallback(async (force = false) => {
    // Only fetch if products list is empty, or if we explicitly force a reload
    if (products.length > 0 && !force) {
      return;
    }

    setLoadingMessage("Fetching products...");
    setIsLoading(true);
    try {
      const response = await productService.getAllProducts();
      console.log(response, 'response')
      dispatch(setAllProducts(response.documents || []));
    } catch (error) {
      console.error("Fetch products error:", error);
      toast.error(error.message || "Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  }, [products, dispatch]);

  const createProduct = useCallback(async (data) => {
    setLoadingMessage("Adding product...");
    setIsLoading(true);
    try {
      const product = await productService.createProduct(data);
      dispatch(addProductAction(product));
      toast.success("Product added successfully!");
      return true;
    } catch (error) {
      console.error("Create product error:", error);
      toast.error(error.message || "Failed to add product. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const updateProduct = useCallback(async (productId, updatedData, oldImageUrls) => {
    setLoadingMessage("Updating product...");
    setIsLoading(true);
    try {
      const updatedProduct = await productService.updateProduct(
        productId,
        updatedData,
        oldImageUrls
      );
      dispatch(updateProductInState(updatedProduct));
      toast.success("Product updated successfully");
      return true;
    } catch (error) {
      console.error("Update product error:", error);
      toast.error(error.message || "Failed to update product.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const deleteProduct = useCallback(async (productId) => {
    setLoadingMessage("Deleting product...");
    setIsLoading(true);
    try {
      await productService.deleteProduct(productId);
      dispatch(deleteProductFromState(productId));
      toast.success("Product deleted successfully");
      return true;
    } catch (error) {
      console.error("Delete product error:", error);
      toast.error(error.message || "Failed to delete product.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return {
    products,
    isLoading,
    loadingMessage,
    fetchProductsIfNeeded,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
