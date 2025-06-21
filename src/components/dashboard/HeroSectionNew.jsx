import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <div 
      className="relative overflow-hidden rounded-2xl p-8 text-white"
      style={{
        background: 'linear-gradient(135deg, #7C5CFC 0%, #9C7DFF 100%)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="absolute right-0 top-0 h-full w-full"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200 50 L350 150 L200 250 L50 150 Z"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="300" cy="100" r="40" stroke="white" strokeWidth="2" fill="none" />
          <path
            d="M100 100 Q150 50 200 100 Q250 150 300 100"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-full backdrop-blur-sm">
            ONLINE COURSE
          </span>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 leading-tight">
          Sharpen Your Skills with<br />
          Professional Online Courses
        </h1>
        
        <Button 
          className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3 rounded-lg"
        >
          Join Now
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
