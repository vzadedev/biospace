import { Check } from "lucide-react";
import { UPLOAD_TIPS } from "@/lib/constants";

export function TipsBox() {
  return (
    <div className="rounded-2xl bg-sage p-5">
      <h3 className="mb-3 font-semibold text-forest">
        Dicas para melhores resultados
      </h3>
      <ul className="space-y-2">
        {UPLOAD_TIPS.map((tip) => (
          <li key={tip} className="flex items-start gap-2 text-sm text-charcoal/80">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
