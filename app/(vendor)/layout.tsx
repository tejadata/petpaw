import { PawPrint, Store } from "lucide-react";
import Link from "next/link";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-3 py-6 sm:p-4">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-[320px] w-[320px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Link href="/" className="mb-6 sm:mb-8 flex items-center gap-2.5 group">
        <PawPrint className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
        <span className="text-2xl font-bold tracking-tight">PawMatch</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
          <Store className="h-3 w-3" />
          Vendor
        </span>
      </Link>
      {children}
    </div>
  );
}
