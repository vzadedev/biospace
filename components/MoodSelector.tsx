"use client";

import {
  Flower2,
  Home,
  Leaf,
  Lightbulb,
  Trophy,
} from "lucide-react";
import { MOODS } from "@/lib/constants";
import type { DecorationMood } from "@/lib/types";

interface MoodSelectorProps {
  value: DecorationMood | null;
  onChange: (mood: DecorationMood) => void;
}

const iconMap = {
  lotus: Flower2,
  lightbulb: Lightbulb,
  house: Home,
  trophy: Trophy,
  leaf: Leaf,
};

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="space-y-3">
      {MOODS.map((mood) => {
        const selected = value === mood.id;
        const Icon = iconMap[mood.icon];
        return (
          <button
            key={mood.id}
            type="button"
            onClick={() => onChange(mood.id)}
            className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
              selected
                ? "border-forest bg-sage/30"
                : "border-transparent bg-white shadow-sm hover:border-forest/20"
            }`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage">
              <Icon className="h-6 w-6 text-forest" />
            </div>
            <span className="flex-1 text-sm font-medium text-charcoal leading-snug">
              {mood.label}
            </span>
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
