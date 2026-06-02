import { type ReactNode } from "react";
import { Navbar } from "./Navbar";

interface AppShellProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function AppShell({
  children,
  className = "",
  noPadding = false,
}: AppShellProps) {
  return (
    <div className={`min-h-screen bg-cream ${className}`}>
      <main
        className={`mx-auto max-w-lg ${noPadding ? "" : "px-5 pt-6 pb-28"} ${className}`}
      >
        {children}
      </main>
      <Navbar />
    </div>
  );
}
