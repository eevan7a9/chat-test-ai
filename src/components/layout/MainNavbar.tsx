"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "../ui/dialog";

interface NavLinksProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

function NavLinks({ mobile = false, onNavigate }: NavLinksProps) {
  return (
    <div
      className={`flex ${
        mobile ? "flex-col gap-6 mt-10" : "items-center gap-6"
      }`}
    >
      <Link
        href="/"
        className="text-sm font-medium hover:text-primary transition-colors"
        onClick={onNavigate}
      >
        Home
      </Link>

      <Link
        href="/about"
        className="text-sm font-medium hover:text-primary transition-colors"
        onClick={onNavigate}
      >
        About
      </Link>
    </div>
  );
}

export default function ResponsiveNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-primary"
          >
            Eevan7a9
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex">
            <NavLinks />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <DialogTitle></DialogTitle>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 px-3">
                <NavLinks mobile onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
