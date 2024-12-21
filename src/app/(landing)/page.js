'use client';
// import { HeroSection } from "@/components/landing/HeroSection";
import NavBar from "@/components/landing/NavBar";
import { Testimonials } from "@/components/landing/Testimonials";
import React from "react";

export default function page() {
  return (
    <div>
      <NavBar />
      {/* <HeroSection /> */}
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <Testimonials />
      </div>
    </div>
  );
}
