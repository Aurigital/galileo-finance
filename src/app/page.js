"use client";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";
import ValueBanner from "@/app/components/ValueBanner";
import CostaRicaBanner from "@/app/components/CostaRicaBanner";
import CtaBanner from "@/app/components/CtaBanner";

export default function Galileo() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-[url('/assets/Website.avif')] bg-cover bg-center md:bg-top bg-no-repeat">
      <Navbar />
      <Hero />
      <CostaRicaBanner />
      <Features />
      <ValueBanner />
      <CtaBanner />
    </div>
    <Footer />
    </>
  );
}
