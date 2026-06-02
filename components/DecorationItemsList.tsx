import Image from "next/image";
import type { DecorationItem } from "@/lib/types";

interface DecorationItemsListProps {
  items: DecorationItem[];
  title?: string;
  compact?: boolean;
}

export function DecorationItemsList({
  items,
  title = "Itens usados na decoração",
  compact = false,
}: DecorationItemsListProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-base font-bold text-charcoal">{title}</h2>
      <div className={compact ? "flex gap-3 overflow-x-auto pb-1" : "space-y-3"}>
        {items.map((item) => (
          <div
            key={item.id}
            className={
              compact
                ? "flex w-36 shrink-0 flex-col rounded-xl bg-white border border-gray-100 p-2 shadow-sm"
                : "flex gap-3 rounded-2xl bg-white p-3 shadow-sm border border-gray-100"
            }
          >
            <div
              className={
                compact
                  ? "relative mx-auto h-16 w-16 overflow-hidden rounded-lg"
                  : "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl"
              }
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            </div>
            <div className={compact ? "mt-2 text-center" : "min-w-0 flex-1"}>
              <p className="text-xs font-medium text-forest">{item.category}</p>
              <p
                className={`font-semibold text-charcoal ${compact ? "text-xs line-clamp-2" : "text-sm"}`}
              >
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
