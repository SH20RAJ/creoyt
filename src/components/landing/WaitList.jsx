import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export const WaitList = () => {
  return (
    <div className="bg-background">
      <TextParallaxContent
        imgUrl="/creator-1.jpg"
        subheading="AI-Powered Growth"
        heading="Scale your YouTube channel."
      >
        <ExampleContent 
          heading="Smart analytics and AI recommendations"
          description="Get deep insights into your channel performance with machine learning algorithms that analyze trends and provide actionable growth strategies."
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/creator-2.jpg"
        subheading="Content Optimization"
        heading="Create better content."
      >
        <ExampleContent 
          heading="AI-driven title and thumbnail optimization"
          description="Generate high-performing video titles and thumbnails using our AI tools that understand what works for your niche and audience preferences."
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="/creator-3.jpg"
        subheading="Virtual Coach"
        heading="Grow with guidance."
      >
        <ExampleContent 
          heading="Personalized growth strategies" 
          description="Get a virtual AI coach that provides customized recommendations based on your channel's unique characteristics and goals."
        />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-black/60"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl font-medium md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = ({ heading, description }) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      {heading}
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
        {description}
      </p>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full rounded-lg bg-primary px-9 py-4 text-xl text-primary-foreground transition-colors hover:bg-primary/90 md:w-fit"
      >
        Join Waitlist <FiArrowUpRight className="inline" />
      </motion.button>
    </div>
  </div>
);