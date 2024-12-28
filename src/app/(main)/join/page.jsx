"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function SignUp() {
  const { data: session } = useSession();

  if (session?.user) {
    // redirect to dashboard if user is already logged in
    redirect("/dashboard");
    return null;
  }
  return (
    <div className="flex h-screen flex-col md:flex-row dark:bg-gray-900">
      {/* Image Section */}
      <div className="w-full hidden md:w-1/2  sm:flex items-start justify-start ">
        <Image
          src="/assets/login-bar.png"
          alt="CreoYT Assistant"
          width={600}
          height={400}
          className="rounded-lg shadow-xl   h-full"
        />
      </div>
      {/* Sign-up Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          {/* Rounded Logo */}
          <div className="flex justify-center">
            <Image
              src="/assets/logo.gif"
              alt="CreoYT Logo"
              width={120}
              height={120}
              className="rounded-full shadow-md"
            />
          </div>

          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              Welcome to{" "}
              <Link
                href={"/"}
                className="text-orange-100 decoration-wavy underline-offset-4 decoration-1 underline"
              >
                CreoYT
              </Link>
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Your Ultimate YouTube Content Assistant
            </p>
          </div>

          <div className="mt-8">
            <Button
              className="w-full flex items-center justify-center"
              onClick={() => signIn("google")}
            >
              <svg  viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
              Sign up with Google
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By signing up, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
