import { FiEdit2, FiTrash2 } from "react-icons/fi";

const ProductActions = ({ product, onEdit, onDelete, className = "" }) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <button
        onClick={() => onEdit(product)}
        title="Edit product"
        className="p-1.5 hover:bg-gray-100 text-gray-600 hover:text-black rounded transition-colors"
      >
        <FiEdit2 className="text-base" />
      </button>
      <button
        onClick={() => onDelete(product)}
        title="Delete product"
        className="p-1.5 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded transition-colors"
      >
        <FiTrash2 className="text-base" />
      </button>
    </div>
  );
};

export default ProductActions;