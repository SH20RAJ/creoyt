"use client";
import React, { useEffect, useState, Suspense } from "react"; // Add Suspense import
import { useSearchParams } from "next/navigation";
// ... other imports remain the same

// Create a wrapper component that uses useSearchParams
function TopicPageContent() {
  const searchParams = useSearchParams();
  // ... rest of your existing component logic
}

// Modify the main component to use Suspense
export default function TopicPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <TopicPageContent />
    </Suspense>
  );
}


const LoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 w-full max-w-3xl p-8">
        <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6"></div>
        </div>
      </div>
    </div>
  );
};