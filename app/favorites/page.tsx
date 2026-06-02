"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  return (
    <AppShell>
      <PageHeader title="Favoritos" backHref="/" />
      <div className="mt-16 flex flex-col items-center text-center px-4">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage">
          <Heart className="h-8 w-8 text-forest" />
        </div>
        <h2 className="text-lg font-semibold text-charcoal">Em breve</h2>
        <p className="mt-2 text-sm text-gray-500">
          Seus projetos favoritos aparecerão aqui.
        </p>
      </div>
    </AppShell>
  );
}
