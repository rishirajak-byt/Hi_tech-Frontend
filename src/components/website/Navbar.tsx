"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/coming-soon" },
    { name: "Programs", href: "/coming-soon" },
    { name: "Admission", href: "/coming-soon" },
    { name: "Faculty", href: "/coming-soon" },
    { name: "Campus Life", href: "/coming-soon" },
    { name: "Contact", href: "/coming-soon" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-hitech-navy rounded-lg flex items-center justify-center">
            <span className="text-white font-heading font-bold text-xl">HT</span>
          </div>
          <div className={cn("flex flex-col", isScrolled ? "text-hitech-navy" : "text-white")}>
            <span className="font-heading font-bold leading-tight">HiTech</span>
            <span className="text-xs font-medium tracking-widest uppercase">University</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-hitech-saffron",
                isScrolled ? "text-gray-700" : "text-gray-100"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 group",
              isScrolled
                ? "bg-hitech-navy text-white hover:bg-hitech-navy/90"
                : "bg-white text-hitech-navy hover:bg-gray-100"
            )}
          >
            Student Login
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={cn("md:hidden", isScrolled ? "text-hitech-navy" : "text-white")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl py-4 flex flex-col px-4 gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-800 font-medium py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="w-full text-center px-5 py-3 rounded-md bg-hitech-navy text-white font-semibold mt-2"
          >
            Student Login
          </Link>
        </div>
      )}
    </header>
  );
}
