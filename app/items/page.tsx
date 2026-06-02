"use client";

import Image from "next/image";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { PROJECT_ITEMS } from "@/lib/constants";

export default function ItemsPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(PROJECT_ITEMS.map((item) => [item.id, 1]))
  );

  const total = PROJECT_ITEMS.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] ?? 1),
    0
  );

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) + delta),
    }));
  };

  return (
    <AppShell>
      <PageHeader title="Itens do projeto" backHref="/result" />

      <div className="mt-6 space-y-4">
        {PROJECT_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-charcoal truncate">
                {item.name}
              </h3>
              <p className="text-sm font-bold text-forest">
                R$ {item.price.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => updateQty(item.id, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-semibold">
                {quantities[item.id]}
              </span>
              <button
                type="button"
                onClick={() => updateQty(item.id, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-forest">
            R$ {total.toFixed(2).replace(".", ",")}
          </span>
        </div>
        <div className="mt-4">
          <Button>Adicionar ao carrinho</Button>
        </div>
      </div>
    </AppShell>
  );
}
