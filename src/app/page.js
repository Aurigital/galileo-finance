"use client";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";
import ValueBanner from "@/app/components/ValueBanner";
import CostaRicaBanner from "@/app/components/CostaRicaBanner";
import CtaBanner from "@/app/components/CtaBanner";
import InfiniteCarousel from "@/app/components/InfiniteCarousel";
import HowItWorks from "@/app/components/HowItWorks";
import Team from "@/app/components/Team";
import Audience from "@/app/components/Audience";
import FAQ from "@/app/components/FAQ";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Galileo() {
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      delay: 0,
    });
  }, []);

  return (
    <>
    <Navbar />
    <div className="flex flex-col min-h-screen bg-[url('/assets/Website.avif')] bg-cover bg-center md:bg-top bg-no-repeat space-y-16 md:space-y-24">
      <Hero />
      <CostaRicaBanner />
      <Features />
      <HowItWorks />
      <Audience />
      <FAQ />
      <ValueBanner />
      <InfiniteCarousel />
      <CtaBanner />
    </div>
    <Footer />
    </>
  );
}
