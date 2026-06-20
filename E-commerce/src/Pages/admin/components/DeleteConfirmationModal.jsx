const DeleteConfirmationModal = ({
  productToDelete,
  onConfirmDelete,
  onCancel
}) => {
  if (!productToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative p-6 animate-in fade-in zoom-in duration-200">
        <h3 className="text-lg font-semibold text-[#414753] prata-regular border-b border-gray-100 pb-3">
          Delete Product
        </h3>
        <p className="text-sm text-gray-600 my-5">
          Are you sure you want to delete <span className="font-semibold text-black">"{productToDelete.productName}"</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmDelete}
            className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-colors shadow-sm active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;