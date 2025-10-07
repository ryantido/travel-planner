"use client";

import { NavItems } from "@/constants/NavItems";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { login, logout } from "@/lib/auth-actions";
import { Session } from "next-auth";
import { Menu, X } from "lucide-react";
import { AnimatedMenuToggle } from "./animate/AnimatedMenuToggle";

export default function NavBar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className="bg-white/15 backdrop-blur-lg shadow min-h-14 flex justify-center items-center 
      px-4 sticky top-0 z-50"
    >
      <nav
        className="container flex items-center justify-between"
        role="navigation"
      >
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/travel-logo.avif"
            alt="Travel Logo"
            className="aspect-square rounded-xs"
            width={32}
            height={32}
            priority
          />
          <span className="text-2xl font-bold">Velora</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 items-center">
          <ul className="flex space-x-4 items-center">
            {NavItems.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={cn(
                    "font-sans font-medium hover:text-sky-500 relative transition-colors duration-300",
                    pathname === href && "text-sky-500",
                    "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-sky-500 after:scale-x-0 after:transition-transform after:origin-left hover:after:scale-x-100",
                    pathname === href && "after:scale-x-100"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {session && (
            <span className="font-sans font-semibold text-lg ml-6 capitalize select-none">
              Hello, {session?.user?.name}
            </span>
          )}

          {!session && (
            <Button className="font-semibold flex items-center" onClick={login}>
              Sign In
              <Image
                src="/github-mark.svg"
                alt="Github Logo"
                width={18}
                height={18}
                priority
                className="invert ml-1"
              />
            </Button>
          )}

          {session && (
            <Button
              variant="outline"
              className="font-semibold"
              onClick={logout}
            >
              Sign out
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-foreground p-2"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {/* {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />} */}
          <AnimatedMenuToggle isOpen={isMobileMenuOpen} />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "md:hidden fixed top-14 left-0 w-full bg-white/90 backdrop-blur-lg z-40 shadow-lg transition-all duration-300",
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"
        )}
      >
        <ul className="flex flex-col space-y-4 p-6">
          {NavItems.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={pathname === href ? "page" : undefined}
                className={cn(
                  "font-sans font-medium block hover:text-sky-500 transition-colors duration-300",
                  pathname === href && "text-sky-500"
                )}
              >
                {label}
              </Link>
            </li>
          ))}

          {session && (
            <span className="font-sans font-semibold text-base capitalize select-none">
              Hello, {session?.user?.name}
            </span>
          )}

          {!session && (
            <Button className="font-semibold" onClick={login}>
              Sign In
              <Image
                src="/github-mark.svg"
                alt="Github Logo"
                width={18}
                height={18}
                className="invert ml-2"
              />
            </Button>
          )}

          {session && (
            <Button variant="outline" className="font-semibold" onClick={logout}>
              Sign out
            </Button>
          )}
        </ul>
      </div>
    </header>
  );
}
