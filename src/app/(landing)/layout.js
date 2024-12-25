import Footer from "@/components/landing/Footer";
import NavBar from "@/components/landing/NavBar";
import React from "react";

export default function layout({ children }) {
  return (
    <div>

      <NavBar />
      <main className="relative">

        {/* Hero Section */}
        <section className="relative min-h-screen bg-background overflow-hidden">
          <div className="absolute -z-10 bottom-0 left-[20%] right-0 top-[-5%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
          <div className="absolute -z-10 bottom-0 right-[-20%] top-[10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
          <div className="absolute -z-10 bottom-0 left-[-20%] top-[20%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
          <div className="absolute -z-10 bottom-0 right-[-20%] top-[35%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
          <div className="absolute -z-10 bottom-0 left-[40%] top-[50%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />

          <div className="container mx-auto px-4 z-20">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
