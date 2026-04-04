"use client";

import { useState } from "react";
import Link from "next/link";
import { PawPrint, Menu, X, User, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <PawPrint className="h-6 w-6 text-primary" />
            <span>{APP_NAME}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <Link
              href="/vendor/login"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              <Store className="h-3.5 w-3.5" />
              Sell on PawMatch
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/quiz">Find Your Match</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t pb-4">
            <div className="flex flex-col gap-2 pt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/vendor/login"
                className="mx-2 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                onClick={() => setMobileOpen(false)}
              >
                <Store className="h-4 w-4" />
                Sell on PawMatch
              </Link>
              <div className="flex gap-2 mt-4 px-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href="/login">
                    <User className="h-4 w-4 mr-1" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild className="flex-1">
                  <Link href="/quiz">Find Your Match</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
