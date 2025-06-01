

const CardSkeleton = () => {
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl shadow-md p-4 animate-pulse min-h-[180px] min-w-[320px] flex flex-col justify-between"
        >
          {/* Header: Badge + Status */}
          <div className="flex justify-between items-center mb-4">
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
          </div>

          {/* Title */}
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
          <div className="h-5 w-full bg-gray-300 rounded mb-4" />

          {/* Date */}
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />

          {/* Assigned To */}
          <div className="h-5 w-40 bg-purple-200 rounded-xl mb-4" />

          {/* Rejected Info */}
          <div className="h-4 w-32 bg-red-200 rounded-full mb-2" />

          {/* Accept/Reject */}
          <div className="h-9 w-full bg-gray-200 rounded-lg mt-auto mb-2" />

          {/* Admin Options */}
          <div className="h-6 w-20 bg-gray-300 rounded self-end" />
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
