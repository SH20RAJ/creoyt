"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function SignUp() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
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
          alt="Creovate Assistant"
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
              alt="Creovate Logo"
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
                Creovate
              </Link>
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Your Ultimate Creative Content Assistant
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Link href="/sign-up">
              <Button className="w-full">
                Get Started - Sign Up
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="outline" className="w-full">
                Already have an account? Sign In
              </Button>
            </Link>
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
