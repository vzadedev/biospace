"use client";

interface BeforeAfterTabsProps {
  active: "before" | "after";
  onChange: (tab: "before" | "after") => void;
}

export function BeforeAfterTabs({ active, onChange }: BeforeAfterTabsProps) {
  return (
    <div className="flex rounded-xl bg-gray-100 p-1">
      <button
        type="button"
        onClick={() => onChange("before")}
        className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
          active === "before"
            ? "bg-white text-charcoal shadow-sm"
            : "text-gray-500"
        }`}
      >
        Antes
      </button>
      <button
        type="button"
        onClick={() => onChange("after")}
        className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
          active === "after"
            ? "bg-forest text-white shadow-sm"
            : "text-gray-500"
        }`}
      >
        Depois
      </button>
    </div>
  );
}
