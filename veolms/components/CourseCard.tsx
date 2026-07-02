interface CourseCardProps {
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number | null; // null means free
  image: string;
}

export default function CourseCard({ title, instructor, rating, students, price, image }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {price !== null && price > 0 ? (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
            ${price}
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
            Free
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">By {instructor}</p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          {/* Star rating */}
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-yellow-400">
              {index < rating ? '★' : '☆'}
            </span>
          ))}
          <span className="ml-2">({students} students)</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a href="/courses/1" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
            Enroll Now
          </a>
        </div>
      </div>
    </div>
  );
}