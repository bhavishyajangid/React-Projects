import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Query } from "appwrite";
import productService from "../appwrite/product";
import {
  setAllProducts,
  addProduct as addProductAction,
  updateProductInState,
  deleteProductFromState,
} from "../Store/allproduct";
import { toast } from "react-toastify";

export const useAdminProducts = (searchTerm = "") => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.allProducts || []);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  // Fetch all products (with pagination) and optionally filter client-side by searchTerm
  const fetchProducts = useCallback(async () => {
    setLoadingMessage("Fetching products...");
    setIsLoading(true);
    try {
      let offset = 0;
      const limit = 100; // Appwrite max limit per request is 100
      let allProducts = [];

      while (true) {
        const queries = [Query.limit(limit), Query.offset(offset)];
        const response = await productService.getAllProducts(queries);
        const batch = response.documents || [];
        allProducts = [...allProducts, ...batch];
        if (batch.length < limit) {
          // last batch
          break;
        }
        offset += limit;
      }

      // Client-side filter if searchTerm provided
      let filteredProducts = allProducts;
      if (searchTerm.trim() !== "") {
        const term = searchTerm.trim().toLowerCase();
        filteredProducts = allProducts.filter(product => {
          return (
            (product.productName?.toLowerCase().includes(term)) ||
            (product.category?.toLowerCase().includes(term)) ||
            (product.subCategory?.toLowerCase().includes(term))
          );
        });
      }

      dispatch(setAllProducts(filteredProducts));
    } catch (error) {
      console.error("Fetch products error:", error);
      toast.error(error.message || "Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, dispatch]);

  // Fetch on initial load and when searchTerm changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};