"use client";

import { NavItems } from "@/constants/NavItems";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { login, logout } from "@/lib/auth-actions";
import { Session } from "next-auth";

export default function NavBar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  return (
    <header
      className="bg-white/15 backdrop-blur-lg shadow min-h-14 flex justify-center items-center 
      px-4 sticky top-0 z-50"
    >
      <nav className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/travel-logo.avif"
            alt="Travel Logo"
            className="aspect-square rounded-xs"
            width={32}
            height={32}
            objectFit="contain"
            priority
          />
          <span className="text-2xl font-bold font-mono">Velora</span>
        </Link>
        <div className="flex space-x-4 items-center">
          <ul className="flex space-x-4 items-center">
            {NavItems.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={cn(
                    "font-sans font-medium hover:text-sky-500",
                    pathname === href && "text-sky-500",
                    "transition-colors duration-300"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {!session && (
            <Button className="font-semibold" onClick={login}>
              Sign In
              <Image
                src="/github-mark.svg"
                alt="Github Logo"
                width={18}
                height={18}
                priority
                className="text-foreground invert"
              />
            </Button>
          )}
          {session && (
            <Button className="font-semibold outline" onClick={logout}>
              Sign out
            </Button>
          )}
          
        </div>
      </nav>
    </header>
  );
}
