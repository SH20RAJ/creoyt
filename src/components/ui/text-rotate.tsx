"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextRotateProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function TextRotate({
  words,
  duration = 2500,
  className,
}: TextRotateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span className={cn("inline-block transition-all duration-500", className)}>
      {words[currentIndex]}
    </span>
  );
}