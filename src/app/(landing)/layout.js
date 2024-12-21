import Footer from "@/components/landing/Footer";
import NavBar from "@/components/landing/NavBar";
import React from "react";

export default function layout({ children }) {
  return (
    <div>
      <NavBar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen bg-background">
          <div className="container mx-auto px-4">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
