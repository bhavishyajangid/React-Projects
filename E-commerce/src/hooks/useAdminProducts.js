import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Query } from "appwrite";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const reduxProducts = useSelector((state) => state.allProducts.allProducts || []);
  const [loadingMessage, setLoadingMessage] = useState("");

  const { data: queryProducts, isLoading, refetch: fetchProducts } = useQuery({
    queryKey: ['adminProducts'],
    queryFn: async () => {
      setLoadingMessage("Fetching products...");
      let offset = 0;
      const limit = 100;
      let allProducts = [];

      while (true) {
        const queries = [Query.limit(limit), Query.offset(offset)];
        const response = await productService.getAllProducts(queries);
        const batch = response.documents || [];
        allProducts = [...allProducts, ...batch];
        if (batch.length < limit) break;
        offset += limit;
      }
      return allProducts;
    },
    onSuccess: (data) => {
      dispatch(setAllProducts(data));
    },
    onError: (error) => {
      console.error("Fetch products error:", error);
      toast.error(error.message || "Failed to load products.");
    }
  });

  // Client-side filtering
  let products = queryProducts || reduxProducts;
  if (searchTerm.trim() !== "") {
    const term = searchTerm.trim().toLowerCase();
    products = products.filter(product => (
      (product.productName?.toLowerCase().includes(term)) ||
      (product.category?.toLowerCase().includes(term)) ||
      (product.subCategory?.toLowerCase().includes(term))
    ));
  }

  const createMutation = useMutation({
    mutationFn: async (data) => {
      setLoadingMessage("Adding product...");
      return await productService.createProduct(data);
    },
    onSuccess: (product) => {
      dispatch(addProductAction(product));
      queryClient.invalidateQueries(['adminProducts']);
      toast.success("Product added successfully!");
    },
    onError: (error) => {
      console.error("Create product error:", error);
      toast.error(error.message || "Failed to add product. Please try again.");
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ productId, updatedData, oldImageUrls }) => {
      setLoadingMessage("Updating product...");
      return await productService.updateProduct(productId, updatedData, oldImageUrls);
    },
    onSuccess: (updatedProduct) => {
      dispatch(updateProductInState(updatedProduct));
      queryClient.invalidateQueries(['adminProducts']);
      toast.success("Product updated successfully");
    },
    onError: (error) => {
      console.error("Update product error:", error);
      toast.error(error.message || "Failed to update product.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (productId) => {
      setLoadingMessage("Deleting product...");
      await productService.deleteProduct(productId);
      return productId;
    },
    onSuccess: (productId) => {
      dispatch(deleteProductFromState(productId));
      queryClient.invalidateQueries(['adminProducts']);
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      console.error("Delete product error:", error);
      toast.error(error.message || "Failed to delete product.");
    }
  });

  const createProduct = useCallback(async (data) => {
    return createMutation.mutateAsync(data).then(() => true).catch(() => false);
  }, [createMutation]);

  const updateProduct = useCallback(async (productId, updatedData, oldImageUrls) => {
    return updateMutation.mutateAsync({ productId, updatedData, oldImageUrls }).then(() => true).catch(() => false);
  }, [updateMutation]);

  const deleteProduct = useCallback(async (productId) => {
    return deleteMutation.mutateAsync(productId).then(() => true).catch(() => false);
  }, [deleteMutation]);

  return {
    products,
    isLoading: isLoading || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    loadingMessage,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};