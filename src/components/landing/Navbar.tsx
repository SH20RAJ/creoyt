"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/constants/landing";
import { Button } from "@/components/ui/button";
import { ThemeToggleSimple } from "@/components/ui/theme-toggle";

export function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        className={[
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          "transition-colors duration-300",
        ].join(" ")}
      >
        <div
          className={[
            "mt-3 flex h-12 items-center justify-between gap-3",
            "rounded-full border backdrop-blur supports-[backdrop-filter]:bg-white/10",
            scrolled
              ? "bg-white/80 text-gray-900 border-gray-200 shadow-sm dark:bg-black/50 dark:text-white dark:border-white/10"
              : "bg-white/10 text-white border-white/15",
          ].join(" ")}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 pl-4">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
            <span className="text-sm font-semibold tracking-tight">Creaovate</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={[
                  "transition-colors",
                  scrolled
                    ? "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    : "text-white/80 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2 pr-2">
            <ThemeToggleSimple />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/handler/sign-in">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/handler/sign-up">Get Started</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden pr-3"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={[
          "md:hidden transition-all duration-300",
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-2",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur">
            <nav className="flex flex-col gap-3">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-white/90 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex gap-2">
              <Button variant="ghost" size="sm" asChild className="flex-1">
                <Link href="/handler/sign-in">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="flex-1">
                <Link href="/handler/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;

