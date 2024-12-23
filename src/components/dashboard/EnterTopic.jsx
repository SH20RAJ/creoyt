/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { useState } from "react";

export function EnterTopic() {
  let [topic, setTopic] = useState("");
  const placeholders = [
    "Gaming setup and equipment reviews",
    "DIY home improvement tutorials",
    "Healthy meal prep recipes",
    "Tech gadget unboxing and reviews",
    "Travel tips and destination guides",
    "Fitness and workout routines",
    "Personal finance and investing",
    "Digital art and animation tutorials",
  ];

  const handleChange = (e) => {
    console.log("Change Event:", e.target.value);
    setTopic(e.target.value);
  };

  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Only redirect if we have a valid topic
    router.push(`/dashboard/research?topic=${encodeURIComponent(topic)}`);
  };

  return (
    <div className="h-[20rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-foreground">
        What's Your Topic?
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        placeholder="Enter your content topic..."
        name="topic"
      />
    </div>
  );
}
