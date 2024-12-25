import React from "react";
import Link from "next/link";

export default function Tools() {
  return (
    <div className="flex flex-col items-center justify-center bg-background p-6">
      <div className="relative">
        <Link href="/tools/tag-generator">
          <button
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Try Tag Generator for Free
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center  p-1 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              No Signup
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
