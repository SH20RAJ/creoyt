import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <header className="z-[50] sticky top-0 w-full border-b bg-white dark:bg-black border-neutral-200 dark:border-white/[0.1]">
      <div className="hidden lg:block">
        <div className="px-8 flex h-16 items-center max-w-[88rem] mx-auto">
          <div className="mr-4 hidden md:flex">
            <Link
              className="flex items-center justify-center space-x-2 text-2xl font-bold py-6 text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10"
              href="/"
            >
              <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white   flex items-center justify-center rounded-md text-sm antialiased">
                <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl" />
                <div className="text-sm  text-emerald-500 relative z-20">
                  <img
                    alt="Logo"
                    loading="lazy"
                    width={50}
                    height={50}
                    decoding="async"
                    data-nimg={1}
                    className="block dark:hidden"
                    srcSet="/_next/image?url=%2Flogo.png&w=64&q=75 1x, /_next/image?url=%2Flogo.png&w=128&q=75 2x"
                    src="/_next/image?url=%2Flogo.png&w=128&q=75"
                    style={{ color: "transparent" }}
                  />
                  <img
                    alt="Logo"
                    loading="lazy"
                    width={50}
                    height={50}
                    decoding="async"
                    data-nimg={1}
                    className="hidden dark:block"
                    srcSet="/_next/image?url=%2Flogo-dark.png&w=64&q=75 1x, /_next/image?url=%2Flogo-dark.png&w=128&q=75 2x"
                    src="/_next/image?url=%2Flogo-dark.png&w=128&q=75"
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-black dark:text-white font-sans">
                  {" "}
                  CreoYT {/* Changed from Aceternity UI */}
                </h1>
              </div>
            </Link>
          </div>
          <Link
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:rn:"
            data-state="closed"
            href="/"
          >
            <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white   flex items-center justify-center rounded-md text-sm antialiased">
              <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl" />
              <div className="text-sm  text-emerald-500 relative z-20">
                <img
                  alt="Logo"
                  loading="lazy"
                  width={50}
                  height={50}
                  decoding="async"
                  data-nimg={1}
                  srcSet="/_next/image?url=%2Flogo.png&w=64&q=75 1x, /_next/image?url=%2Flogo.png&w=128&q=75 2x"
                  src="/_next/image?url=%2Flogo.png&w=128&q=75"
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium xl:flex">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60 hidden sm:flex space-x-1"
              href="/components"
            >
              Components
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60 hidden sm:flex space-x-1"
              target="_blank"
              href="https://pro.aceternity.com/templates"
            >
              Templates
              <span className="ml-2 rounded-md bg-emerald-200 border border-emerald-400 text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-500 px-1.5 py-0.5 text-xs leading-none  no-underline group-hover:no-underline">
                new
              </span>
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60 hidden sm:flex space-x-1"
              href="/pricing"
            >
              Pricing
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60 hidden sm:flex space-x-1"
              href="/showcase"
            >
              Showcase
            </Link>
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
            <Link
              target="__blank"
              className="transition-colors hover:text-foreground/80 text-foreground/60 mr-3 text-sm font-medium"
              href="https://discord.gg/ftZbQvCdN7"
            >
              <span className="hidden sm:block">Discord</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 dark:text-neutral-500 text-neutral-500 block sm:hidden"
              >
                <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" />
                <path d="M7 16.5c3.5 1 6.5 1 10 0" />
              </svg>
            </Link>
            <Link
              target="__blank"
              className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium"
              href="https://twitter.com/mannupaaji"
            >
              Twitter
            </Link>
            <button className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 py-2 px-3 flex items-center justify-center outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sun h-4 w-4  dark:text-neutral-500 text-neutral-500"
              >
                <circle cx={12} cy={12} r={4} />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <span className="sr-only">Toggle theme</span>
            </button>
            <button className="flex relative justify-start items-center text-sm text-muted-foreground dark:border-white/[0.2] py-2 w-fit border border-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-4 rounded-xl bg-white dark:bg-brand">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-neutral-500"
              >
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
              <span className="transition-colors hover:text-foreground/80 text-foreground/60 text-xs sm:text-sm font-medium pl-2 pr-4">
                Search{" "}
                <span className="hidden xl:inline-block">Components</span>
              </span>
              <kbd className="pointer-events-none  hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="flex justify-between  items-center w-full rounded-md px-4 py-4">
          <Link className="flex items-center gap-1.5" href="/">
            <img
              alt="Logo"
              loading="lazy"
              width={50}
              height={50}
              decoding="async"
              data-nimg={1}
              className="h-6 w-6 object-contain"
              srcSet="/_next/image?url=%2Flogo.png&w=64&q=75 1x, /_next/image?url=%2Flogo.png&w=128&q=75 2x"
              src="/_next/image?url=%2Flogo.png&w=128&q=75"
              style={{ color: "transparent" }}
            />
          </Link>
          <div className="flex items-center gap-4">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              className="text-black dark:text-white h-6 w-6"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M432 176H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 272H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 368H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
