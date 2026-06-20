import { RxCross2 } from "react-icons/rx";
import ProductForm from "./ProductForm/ProductForm";

const EditProductModal = ({
  editingProduct,
  onEditSubmit,
  onClose
}) => {
  if (!editingProduct) return null;

  return (
    <div className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
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
          onSubmit={onEditSubmit}
        />
      </div>
    </div>
  );
};

export default EditProductModal;