/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
export function EnterTopic() {
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
    console.log("Change Event:");
    console.log(e.target.value);
  };
  
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const formData = new FormData(e.target);
    const topic = formData.get('topic'); // Retrieve the 'topic' input value
    console.log("Submitted Topic:", topic);
  
    if (topic) {
      router.push(`/dashboard/research?topic=${encodeURIComponent(topic)}`);
    } else {
      console.error("Topic is undefined or empty.");
    }
  };
  

  return (
    <div className="h-[20rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-foreground">
        What's Your Topic?
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={()=>console.log("Change Event:")}
        onSubmit={()=>console.log("Change Event:")}
        placeholder="Enter your content topic..."

        />
    </div>
  );
}
