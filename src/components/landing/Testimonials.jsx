'use client';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import React, { useEffect, useRef, useState } from "react";

// Handler hook for when Outside click dropdown close
let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });
  return domNode;
};

const Video = () => {
  const [videoOpen, setvideoOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setvideoOpen(false);
  });

  return (
    <section className="relative py-20 bg-background">
      <div ref={domNode} className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <div className="absolute inset-0">
                <img
                  src="https://i.ibb.co/KbSwcWJ/image-01-1.jpg"
                  alt="Video thumbnail"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm">
                <button
                  onClick={() => setvideoOpen(true)}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                >
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20">
                    <span className="absolute -inset-4 animate-ping rounded-full bg-white/20"></span>
                    <svg
                      width="23"
                      height="27"
                      viewBox="0 0 23 27"
                      className="fill-white"
                    >
                      <path d="M22.5 12.634C23.1667 13.0189 23.1667 13.9811 22.5 14.366L2.25 26.0574C1.58333 26.4423 0.750001 25.9611 0.750001 25.1913L0.750002 1.80866C0.750002 1.03886 1.58334 0.557731 2.25 0.942631L22.5 12.634Z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="aspect-video">
              <iframe
                className="h-full w-full rounded-xl"
                src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => setvideoOpen(false)}
              className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <svg viewBox="0 0 16 15" className="h-5 w-5">
                <path d="M3.37258 1.27L8.23258 6.13L13.0726 1.29C13.1574 1.19972 13.2596 1.12749 13.373 1.07766C13.4864 1.02783 13.6087 1.00141 13.7326 1C13.9978 1 14.2522 1.10536 14.4397 1.29289C14.6272 1.48043 14.7326 1.73478 14.7326 2C14.7349 2.1226 14.7122 2.24439 14.6657 2.35788C14.6193 2.47138 14.5502 2.57419 14.4626 2.66L9.57258 7.5L14.4626 12.39C14.6274 12.5512 14.724 12.7696 14.7326 13C14.7326 13.2652 14.6272 13.5196 14.4397 13.7071C14.2522 13.8946 13.9978 14 13.7326 14C13.6051 14.0053 13.478 13.984 13.3592 13.9375C13.2404 13.8911 13.1326 13.8204 13.0426 13.73L8.23258 8.87L3.38258 13.72C3.29809 13.8073 3.19715 13.8769 3.08559 13.925C2.97402 13.9731 2.85405 13.9986 2.73258 14C2.46737 14 2.21301 13.8946 2.02548 13.7071C1.83794 13.5196 1.73258 13.2652 1.73258 13C1.73025 12.8774 1.753 12.7556 1.79943 12.6421C1.84586 12.5286 1.91499 12.4258 2.00258 12.34L6.89258 7.5L2.00258 2.61C1.83777 2.44876 1.74112 2.23041 1.73258 2C1.73258 1.73478 1.83794 1.48043 2.02548 1.29289C2.21301 1.10536 2.46737 1 2.73258 1C2.97258 1.003 3.20258 1.1 3.37258 1.27Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Creoyt's AI-powered solutions have revolutionized how we manage and analyze our data. The insights are invaluable.",
      name: "David Chen",
      designation: "Data Science Lead at TechCorp",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The integration of Creoyt's platform was seamless. Their AI models have significantly improved our prediction accuracy.",
      name: "Rachel Martinez",
      designation: "AI Research Director at DataFlow",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Creoyt's custom ML solutions helped us automate complex processes that used to take weeks. Game-changing technology.",
      name: "Mark Thompson",
      designation: "CTO at AI Innovations",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}

export default Video;
