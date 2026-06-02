"use client";

import Image from "next/image";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { PLANT_SUGGESTIONS } from "@/lib/constants";

export default function SuggestionsPage() {
  return (
    <AppShell>
      <PageHeader title="Sugestões da IA" backHref="/result" />

      <div className="mt-6 space-y-4">
        {PLANT_SUGGESTIONS.map((plant) => (
          <div
            key={plant.id}
            className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={plant.image}
                alt={plant.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-charcoal">{plant.name}</h3>
              <p className="text-xs text-gray-500 italic">{plant.scientific}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {plant.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-sage px-2.5 py-0.5 text-xs font-medium text-forest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button>Ver mais plantas</Button>
      </div>
    </AppShell>
  );
}
