"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS } from "@/constants/landing/navigation";
import { Menu, X } from "lucide-react";
import { useUser, UserButton } from '@stackframe/stack';
import Link from 'next/link';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold">Creovate</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
                {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link href="/handler/sign-in">
                  <Button variant="ghost">
                    Sign In
                  </Button>
                </Link>
                <Link href="/handler/sign-up">
                  <Button>
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">
                    Dashboard
                  </Button>
                </Link>
                <UserButton />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-accent"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium px-2 py-1"
                  onClick={() => setIsOpen(false)}
                  {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 mt-4 border-t border-border/50">
                {!user ? (
                  <>
                    <Link href="/handler/sign-in">
                      <Button variant="ghost" className="justify-start">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/handler/sign-up">
                      <Button className="justify-start">
                        Get Started
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost" className="justify-start">
                        Dashboard
                      </Button>
                    </Link>
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <UserButton />
                      <span className="text-sm text-muted-foreground">Account</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
