import Footer from "@/components/landing/Footer";
import NavBar from "@/components/landing/NavBar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen bg-background overflow-hidden z-0">
          {/* Radial Gradient Circles */}
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] z-[-1]" />
            <div className="absolute bottom-0 right-[-20%] top-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] z-[-1]" />
            <div className="absolute bottom-0 left-[-20%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] z-[-1]" />
            <div className="absolute bottom-0 right-[-20%] top-[35%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] z-[-1]" />
            <div className="absolute bottom-0 left-[40%] top-[50%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] z-[-1]" />
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-4 z-10">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
