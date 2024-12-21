/* eslint-disable react/no-unescaped-entities */
import React from "react";

const FeatureList = () => {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
          Unlock Your Channel&apos;s Full Potential
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Transform your YouTube presence with AI-powered tools designed to
          boost your creativity and accelerate channel growth.
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side: Features */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-6 rounded-xl bg-card hover:bg-accent/10 transition-colors">
                <span className="p-3 rounded-lg bg-indigo-500/10 text-indigo-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    AI Content Generator
                  </h3>
                  <p className="text-muted-foreground">
                    Create engaging titles, descriptions, and thumbnails
                    optimized for maximum reach and engagement.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl bg-card hover:bg-accent/10 transition-colors">
                <span className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Analytics Insights
                  </h3>
                  <p className="text-muted-foreground">
                    Get deep insights into your channel's performance with
                    AI-powered analytics and recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl bg-card hover:bg-accent/10 transition-colors">
                <span className="p-3 rounded-lg bg-green-500/10 text-green-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Smart Scheduling
                  </h3>
                  <p className="text-muted-foreground">
                    Post at the perfect time with AI-optimized scheduling based
                    on your audience's activity patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Video Embed */}
          <div className="w-full lg:w-1/2 border border-fusia-200">
            <div className="aspect-video flex flex-col items-center   justify-center rounded-xl overflow-hidden shadow-xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/WhWc3b3KhnY"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureList;
