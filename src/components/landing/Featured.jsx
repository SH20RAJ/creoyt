/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const ShuffleGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="aspect-square w-full rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section
      className="relative w-full px-8 py-24 md:py-32 overflow-hidden"
      aria-label="Hero section"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full text-sm md:text-base text-indigo-600 bg-indigo-50 border border-indigo-200 font-medium"
            role="text"
          >
            Create with CreoYT
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
          >
            Your Ultimate YouTube Content Assistant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg"
          >
            Join CreoYT to create engaging YouTube content, analyze performance,
            and grow your channel with AI-powered insights and tools.
          </motion.p>{" "}
          <Link href="/join">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-indigo-500 text-white font-medium py-3 px-8 rounded-lg transition-all hover:bg-indigo-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:ring-offset-background"
              aria-label="Get Started"
            >
              Get Started
            </motion.button>{" "}
          </Link>
        </div>
        <div className="relative z-10">
          <ShuffleGrid />
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-1/2 h-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-1/2 h-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>
    </section>
  );
};

export const BouncyCardsFeatures = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-foreground">
      <div className="mb-8 flex flex-col items-center justify-between  gap-4 md:flex-row md:items-end md:px-4">
        <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
          Grow
          <span className="text-muted-foreground"> </span> with{" "}
          <span className="text-indigo-500"> AI-powered</span> tools
        </h2>
        <Link href={"/features"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="whitespace-nowrap rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 px-4 py-2 font-medium text-white shadow-xl transition-transform hover:from-purple-600 hover:to-indigo-700"
          >
            Get Started
          </motion.button>
        </Link>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4 bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
          <CardTitle>Channel Analysis</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-4 shadow-md transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-white">
              Deep insights into your channel performance with ML
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
          <CardTitle>AI Content Researcher</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-yellow-500 to-orange-600 p-4 shadow-md transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-white">
              Generates research content titles, descriptions, tags, playlist
              names, and ideas for the next topic.
            </span>
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8 bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg">
          <CardTitle>Thumbnail Creator</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-teal-500 to-emerald-600 p-4 shadow-md transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-white">
              Create eye-catching thumbnails with A/B testing
            </span>
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4 bg-gradient-to-br from-pink-500 to-red-600 shadow-lg">
          <CardTitle>Virtual AI Coach</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-pink-500 to-red-600 p-4 shadow-md transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center font-semibold text-white">
              Get personalized growth strategies
            </span>
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-card p-8 shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-semibold text-foreground">
      {children}
    </h3>
  );
};
