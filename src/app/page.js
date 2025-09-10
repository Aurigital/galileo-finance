"use client";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";
import ValueBanner from "@/app/components/ValueBanner";

export default function Galileo() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-[url('/assets/Website.avif')] bg-cover bg-no-repeat">
      <Navbar />
      <Hero />
      <Features />
      <ValueBanner />
    </div>
    <Footer />
    </>
  );
}
