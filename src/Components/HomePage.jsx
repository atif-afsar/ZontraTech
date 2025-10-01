import React from 'react';
import Hero from './Hero';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';
import AboutUs from './AboutUse';
import FAQ from './FAQ';
import ContactForm from './ContactForm';
import Footer from './Footer'; // The Footer is part of the home page layout


// Import all your section components


const HomePage = () => {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <AboutUs />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;