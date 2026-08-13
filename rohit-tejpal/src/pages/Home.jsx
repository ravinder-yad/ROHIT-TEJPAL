import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import BrandIntroduction from '../components/home/BrandIntroduction';
import ShopByCollection from '../components/home/ShopByCollection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Craftsmanship from '../components/home/Craftsmanship';
import NewArrivals from '../components/home/NewArrivals';
import WhyRohitTejpal from '../components/home/WhyRohitTejpal';
import InstagramFeed from '../components/home/InstagramFeed';
import WhatsAppCTA from '../components/home/WhatsAppCTA';

const Home = () => {
  return (
    <div className="w-full flex flex-col">
      <HeroSlider />
      <BrandIntroduction />
      <ShopByCollection />
      <FeaturedProducts />
      <Craftsmanship />
      <NewArrivals />
      <WhyRohitTejpal />
      <InstagramFeed />
      <WhatsAppCTA />
    </div>
  );
};

export default Home;
