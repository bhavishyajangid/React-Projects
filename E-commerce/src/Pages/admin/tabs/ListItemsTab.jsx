import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import ProductForm from "../components/ProductForm/ProductForm";

const INITIAL_PRODUCTS = [
  {
    id: "p1",
    name: "Men's Round Neck Cotton T-Shirt",
    description: "A premium quality lightweight cotton t-shirt with classic round neck design.",
    price: 28,
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestseller: true,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=200",
      null,
      null,
      null,
    ],
  },
  {
    id: "p2",
    name: "Women High Rise Skinny Jeans",
    description: "Comfortable stretchy skinny denim jeans with high waisted outline.",
    price: 45,
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=200",
      null,
      null,
      null,
    ],
  },
  {
    id: "p3",
    name: "Kids Hooded Winter Fleece",
    description: "Warm and cozy fleece hoodie jacket for young children.",
    price: 35,
    category: "Kids",
    subCategory: "Winterwear",
    sizes: ["S", "M"],
    bestseller: true,
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=200",
      null,
      null,
      null,
    ],
  },
  {
    id: "p4",
    name: "Women Ribbed Knit Sweater",
    description: "Soft ribbed winterwear knitted sweater with turtle neck.",
    price: 55,
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL"],
    bestseller: false,
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=200",
      null,
      null,
      null,
    ],
  },
  {
    id: "p5",
    name: "Men's Relaxed Fit Cargo Pants",
    description: "Durable cotton utility cargo pants with multiple side pockets.",
    price: 38,
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["L", "XL", "XXL"],
    bestseller: true,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=200",
      null,
      null,
      null,
    ],
  },
];

const ListItemsTab = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateSubmit = (updatedData) => {
    // Process new images if selected, keep existing strings if not changed
    const processedImages = updatedData.images.map((img, idx) => {
      if (img instanceof File) {
        return URL.createObjectURL(img); // Mock upload path
      }
      return img || editingProduct.images[idx];
    });

    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id
          ? { ...p, ...updatedData, images: processedImages }
          : p
      )
    );

    setEditingProduct(null);
    toast.success("Product updated successfully");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
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
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 overflow-hidden">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs font-semibold">
                            N/A
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">
                      <div>
                        <p>{product.name}</p>
                        <p className="text-xs text-gray-400 font-normal mt-0.5">
                          Sizes: {product.sizes.join(", ")}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      <div className="flex flex-col">
                        <span>{product.category}</span>
                        <span className="text-xs text-gray-400">{product.subCategory}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-gray-900">
                      ${product.price}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {product.bestseller ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffebf0] text-[#ff4e70]">
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleEditClick(product)}
                          title="Edit product"
                          className="p-1.5 hover:bg-gray-100 text-gray-600 hover:text-black rounded transition-colors"
                        >
                          <FiEdit2 className="text-base" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          title="Delete product"
                          className="p-1.5 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded transition-colors"
                        >
                          <FiTrash2 className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile screens */}
          <div className="grid grid-cols-1 divide-y divide-gray-100 md:hidden">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-4 flex gap-4 hover:bg-gray-50/50">
                <div className="w-16 h-16 bg-gray-100 rounded border border-gray-200 overflow-hidden shrink-0">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs font-semibold">
                      N/A
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900 text-sm truncate pr-2">
                      {product.name}
                    </h4>
                    <span className="font-semibold text-gray-900 text-sm">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.category} • {product.subCategory}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Sizes: {product.sizes.join(", ")}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    {product.bestseller ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#ffebf0] text-[#ff4e70]">
                        Bestseller
                      </span>
                    ) : (
                      <div />
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-medium flex items-center gap-1 transition-colors"
                      >
                        <FiEdit2 className="text-xs" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="px-2.5 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded font-medium flex items-center gap-1 transition-colors"
                      >
                        <FiTrash2 className="text-xs" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 text-gray-500 hover:text-black rounded-full transition-colors z-10"
              title="Close modal"
            >
              <RxCross2 className="text-xl" />
            </button>
            <div className="mb-6">
              <h3 className="text-xl font-medium text-[#414753] prata-regular border-b border-gray-100 pb-3">
                Edit Product
              </h3>
            </div>
            <ProductForm
              mode="edit"
              defaultValues={editingProduct}
              onSubmit={handleUpdateSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListItemsTab;
