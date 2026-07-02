export default function Hero() {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Animated shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/6 -z-10 w-32 h-32 bg-indigo-500/20 blur-3xl transform -rotate-12" aria-hidden="true"></div>
        <div className="absolute bottom-1/3 right-1/5 -z-10 w-48 h-48 bg-emerald-500/20 blur-3xl transform rotate-6" aria-hidden="true"></div>
      </div>

      <div className="max-w-7xl mx-auto py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
            Learn Anything, Anytime
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-500 dark:text-gray-400">
            Access thousands of courses from industry experts. Start learning today and achieve your goals.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <input
              type="text"
              placeholder="Search for courses, instructors, or topics"
              className="flex-1 min-w-[250px] px-5 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs lg:max-w-md"
            />
            <button className="rounded-md px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Search Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}