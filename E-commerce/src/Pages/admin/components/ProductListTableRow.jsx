import { memo } from "react";
import ProductActions from "./ProductActions";

function ProductListTableRow({ product, onEdit, onDelete }) {
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="py-4 px-6">
                <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 overflow-hidden">
                    {product.images?.[0] ? (
                        <img
                            src={product.images[0]}
                            alt={product.productName}
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
                    <p>{product.productName}</p>
                    <p className="text-xs text-gray-400 font-normal mt-0.5">
                        Sizes: {product.sizes ? product.sizes.join(", ") : ""}
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
                ${product.sellingPrice ?? product.price}
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
                <ProductActions
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </td>
        </tr>
    )
}


export default memo(ProductListTableRow)