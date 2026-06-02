"use client";

import Image from "next/image";
import { STYLES } from "@/lib/constants";
import type { DecorationStyle } from "@/lib/types";

interface StyleSelectorProps {
  value: DecorationStyle | null;
  onChange: (style: DecorationStyle) => void;
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      {STYLES.map((style) => {
        const selected = value === style.id;
        return (
          <button
            key={style.id}
            type="button"
            onClick={() => onChange(style.id)}
            className={`flex w-full items-center gap-4 rounded-2xl border-2 p-3 text-left transition-all ${
              selected
                ? "border-forest bg-sage/30"
                : "border-transparent bg-white shadow-sm hover:border-forest/20"
            }`}
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={style.image}
                alt={style.label}
                fill
                className="object-cover"
                sizes="56px"
                unoptimized
              />
            </div>
            <span className="flex-1 font-medium text-charcoal">{style.label}</span>
            <div
              className={`h-5 w-5 shrink-0 rounded-full border-2 ${
                selected
                  ? "border-forest bg-forest"
                  : "border-gray-300 bg-white"
              }`}
            >
              {selected && (
                <div className="m-auto mt-1 h-2 w-2 rounded-full bg-white" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
