import { PawPrint } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <PawPrint className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">PawMatch</span>
      </Link>
      {children}
    </div>
  );
}
