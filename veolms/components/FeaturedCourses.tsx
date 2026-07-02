import CourseCard from './CourseCard';

export default function FeaturedCourses() {
  const courses = [
    {
      title: 'The Complete JavaScript Course 2024',
      instructor: 'Jonas Schmedtmann',
      rating: 4.8,
      students: 345280,
      price: 84,
      image: 'https://img-c.udemycdn.com/course/240x135/2427570_3a3a_5.jpg',
    },
    {
      title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
      instructor: 'Maximilian Schwarzmüller',
      rating: 4.7,
      students: 587321,
      price: 94,
      image: 'https://img-c.udemycdn.com/course/240x135/2428484_ff38_5.jpg',
    },
    {
      title: 'HTML and CSS: Build Responsive Real-World Websites',
      instructor: 'Jonas Schmedtmann',
      rating: 4.8,
      students: 284721,
      price: 0,
      image: 'https://img-c.udemycdn.com/course/240x135/2598304_84a6_3.jpg',
    },
    {
      title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp 2024',
      instructor: 'Jonas Schmedtmann',
      rating: 4.6,
      students: 192840,
      price: 79,
      image: 'https://img-c.udemycdn.com/course/240x135/2522660_3ef3_5.jpg',
    },
    {
      title: 'Python for Data Science and Machine Learning Bootcamp',
      instructor: 'Jose Portilla',
      rating: 4.7,
      students: 485932,
      price: 89,
      image: 'https://img-c.udemycdn.com/course/240x135/252698_8456_2.jpg',
    },
    {
      title: 'UI / UX Design With Figma: From Beginner to Expert',
      instructor: 'Mahmoud Ahmed',
      rating: 4.5,
      students: 124580,
      price: 59,
      image: 'https://img-c.udemycdn.com/course/240x135/2783132_805a_5.jpg',
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          Featured Courses
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}