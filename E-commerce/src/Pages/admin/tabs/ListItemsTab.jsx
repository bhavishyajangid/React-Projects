import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import ProductForm from "../components/ProductForm/ProductForm";
import LoaderOverlay from "../../../components/LoaderOverlay";
import { useAdminProducts } from "../../../hooks/useAdminProducts";
import ProductListTableRow from "../components/ProductListTableRow";
import ProductActions from "../components/ProductActions";
import EditProductModal from "../components/EditProductModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const ListItemsTab = () => {
  const {
    products,
    isLoading,
    loadingMessage,
    fetchProducts,
    updateProduct,
    deleteProduct,
  } = useAdminProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    const { $id } = productToDelete;
    setProductToDelete(null);
    await deleteProduct($id);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);

  };

  const handleUpdateSubmit = async (updatedData) => {
    if (!editingProduct) return;
    const oldImageUrls = editingProduct.images?.filter(Boolean) || [];
    const success = await updateProduct(editingProduct.$id, updatedData, oldImageUrls);
    if (success) {
      setEditingProduct(null);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      (product.productName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.subCategory || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      {isLoading && <LoaderOverlay message={loadingMessage} />}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-medium text-[#414753] prata-regular">
            All Products List
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage your store inventory: update prices, sizes, categories, or remove products.
          </p>
        </div>
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md outline-none px-3 text-sm focus:border-black focus:ring-1 focus:ring-black placeholder:text-gray-400"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] bg-gray-50 rounded-lg border border-dashed border-gray-200 p-8">
          <p className="text-gray-500 text-sm">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          {/* Table for larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4 px-6 w-24">Image</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6 w-36">Category</th>
                  <th className="py-4 px-6 w-28 text-right">Price</th>
                  <th className="py-4 px-6 w-28 text-center">Bestseller</th>
                  <th className="py-4 px-6 w-28 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredProducts.map((product) => (
                  <ProductListTableRow
                    key={product.$id}
                    product={product}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile screens */}
          <div className="grid grid-cols-1 divide-y divide-gray-100 md:hidden">
            {filteredProducts.map((product) => (
              <div key={product.$id} className="p-4 flex gap-4 hover:bg-gray-50/50">
                <div className="w-16 h-16 bg-gray-100 rounded border border-gray-200 overflow-hidden shrink-0">
                  {(() => {
                    const getProductImage = (images) => {
                        if (!images) return null;
                        if (Array.isArray(images) && images.length > 0) {
                            if (images[0].startsWith('["')) {
                                try { return JSON.parse(images[0])[0]; } catch(e) {}
                            }
                            return images[0];
                        }
                        if (typeof images === 'string') {
                            if (images.startsWith('[')) {
                                try { return JSON.parse(images)[0]; } catch(e) {}
                            }
                            return images;
                        }
                        return null;
                    };
                    const imageUrl = getProductImage(product.images);
                    return imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs font-semibold">
                        N/A
                      </div>
                    );
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900 text-sm truncate pr-2">
                      {product.productName}
                    </h4>
                    <span className="font-semibold text-gray-900 text-sm">
                      ${product.sellingPrice ?? product.price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.category} • {product.subCategory}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Sizes: {product.sizes ? product.sizes.join(", ") : ""}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    {product.bestseller ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ffebf0] text-[#ff4e70]">
                        Bestseller
                      </span>
                    ) : (
                      <div />
                    )}
                    <ProductActions
                      product={product}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                      className=""
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      <EditProductModal
        editingProduct={editingProduct}
        onEditSubmit={handleUpdateSubmit}
        onClose={() => setEditingProduct(null)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        productToDelete={productToDelete}
        onConfirmDelete={handleConfirmDelete}
        onCancel={() => setProductToDelete(null)}
      />
    </div>
  );
};

export default ListItemsTab;
