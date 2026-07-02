import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCourses from '@/components/FeaturedCourses';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction'; // we will create this next

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedCourses />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}