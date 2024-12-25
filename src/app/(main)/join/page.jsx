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
              <Link href={"/"} className="text-orange-100 decoration-wavy underline-offset-4 decoration-1 underline">
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
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
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
