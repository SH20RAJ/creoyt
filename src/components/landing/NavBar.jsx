import Link from "next/link";
import React from "react";

const MenuOptions = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Features",
    path: "/features",
  },
  {
    id: 3,
    name: "Pricing",
    path: "/pricing",
  },
  {
    id: 4,
    name: "How It Works",
    path: "/how-it-works",
  },
  {
    id: 5,
    name: "Contact",
    path: "/contact",
  }
];

const NavBar = () => {
  return (
    <header className="z-[100] sticky top-0 w-full border-b backdrop-blur-sm bg-white/80 dark:bg-black/80 border-neutral-200 dark:border-white/[0.1]">
      <div className="hidden lg:block">
        <div className="px-8 flex h-16 items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link className="flex items-center gap-2" href="/">
            <img
              alt="Logo"
              loading="lazy"
              width={50}
              height={50}
              className="h-8 w-8 object-contain"
              src="/logo.svg"
            />
            <span className="font-semibold text-xl">Creo<span className=" text-fuchsia-500">YT</span></span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {[
              ["Home", "/"],
              ["Features", "/features"],
              ["Pricing", "/pricing"],
              ["How It Works", "/how-it-works"],
              ["About", "/about"],
              ["Resources", "/resources"],
              ["Contact", "/contact"]
            ].map(([label, path]) => (
              <Link
                key={path}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href={path}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/community"
              className="text-sm font-medium hover:text-foreground/80"
            >
              Community
            </Link>
            <Link
              href="/join"
              className="text-sm font-medium px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              Log in
            </Link>
            <Link
              href="/join"
              className="text-sm font-medium px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-600 rounded-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="block lg:hidden">
        <div className="flex justify-between items-center w-full px-4 py-4">
          <Link className="flex items-center gap-2" href="/">
            <img
              alt="Logo"
              loading="lazy"
              width={50}
              height={50}
              className="h-8 w-8 object-contain"
              src="/_next/image?url=%2Flogo.png&w=128&q=75"
            />
            <span className="font-semibold text-lg">CreoYT</span>
          </Link>
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            aria-label="Toggle Menu"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              className="h-6 w-6"
              height="1em"
              width="1em"
            >
              <path d="M432 176H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 272H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 368H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2-16-16-16z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
