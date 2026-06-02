"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  backHref?: string;
  rightAction?: ReactNode;
}

export function PageHeader({ title, backHref = "/", rightAction }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 py-2">
      <div className="flex items-center gap-3 min-w-0">
        {backHref && (
          <Link
            href={backHref}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-sage/50 transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5 text-charcoal" />
          </Link>
        )}
        <h1 className="text-xl font-bold text-charcoal truncate">{title}</h1>
      </div>
      {rightAction && <div className="shrink-0">{rightAction}</div>}
    </header>
  );
}
