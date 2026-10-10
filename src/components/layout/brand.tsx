import Link from "next/link";
import { Building2 } from "lucide-react";

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
      <Building2 className="size-6 text-primary" aria-hidden />
      ShareSpace
    </Link>
  );
}