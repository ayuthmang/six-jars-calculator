"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { JARS } from "@/components/six-jars/jars";

const LINKS = [
  { href: "/", label: "Calculator" },
  { href: "/about", label: "Why six jars?" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <span aria-hidden className="flex items-center gap-0.5">
            {JARS.map((jar) => (
              <span
                key={jar.key}
                className="size-1.5 rounded-full"
                style={{ background: jar.color }}
              />
            ))}
          </span>
          Six Jars
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          {LINKS.map(({ href, label }) => {
            const isCurrent = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  isCurrent
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
