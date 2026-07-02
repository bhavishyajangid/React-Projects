export default function CallToAction() {
  return (
    <section className="relative bg-gray-100 dark:bg-gray-900 overflow-hidden py-20">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/10 -z-10 w-40 h-40 bg-indigo-500/10 blur-3xl transform -rotate-6" aria-hidden="true"></div>
        <div className="absolute bottom-1/4 right-1/8 -z-10 w-32 h-32 bg-purple-500/10 blur-3xl transform rotate-12" aria-hidden="true"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Ready to start learning?
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-8">
          Join thousands of students who are already learning new skills every day.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/courses" className="flex-1 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium">
            Browse Courses
          </a>
          <a href="/signup" className="flex-1 px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium">
            Sign Up Free
          </a>
        </div>
      </div>
    </section>
  );
}