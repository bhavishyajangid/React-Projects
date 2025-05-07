import React from 'react';
import PrivateKey from '../../components/PrivateKey';
import FeatureCards from '../../components/FeaturedCards';
import FAQ from '../../components/FAQ.JSX';
import AllCards from '../../components/Cards/AllCards';
import ScrollWithImage from '../../components/slidebar/ScrollWithImage';
import Footer from '../../components/Footer';
import Guarantee from '../../components/Guarantee';
import Header from '../../components/Header';

const Home = () => (
  <div className="w-full min-h-screen flex flex-col bg-black">
     <Header/>
    <FeatureCards />
  <ScrollWithImage />
  <PrivateKey />
  <AllCards />
  <Guarantee/>
  <FAQ />
  <Footer />
  </div>
);

export default Home;
