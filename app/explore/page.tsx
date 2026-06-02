"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Compass } from "lucide-react";

export default function ExplorePage() {
  return (
    <AppShell>
      <PageHeader title="Explorar" backHref="/" />
      <div className="mt-16 flex flex-col items-center text-center px-4">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage">
          <Compass className="h-8 w-8 text-forest" />
        </div>
        <h2 className="text-lg font-semibold text-charcoal">Em breve</h2>
        <p className="mt-2 text-sm text-gray-500">
          Explore inspirações e tendências biofílicas.
        </p>
      </div>
    </AppShell>
  );
}
