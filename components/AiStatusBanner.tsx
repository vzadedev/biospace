import type { AiSource } from "@/lib/ai";

interface AiStatusBannerProps {
  source: AiSource;
  message?: string;
}

const labels: Record<AiSource, { title: string; className: string }> = {
  google: {
    title: "Gerado com Google Gemini",
    className: "bg-forest/10 text-forest border-forest/20",
  },
  openai: {
    title: "Gerado com OpenAI",
    className: "bg-forest/10 text-forest border-forest/20",
  },
  demo: {
    title: "Modo demonstração",
    className: "bg-amber-50 text-amber-900 border-amber-200",
  },
};

export function AiStatusBanner({ source, message }: AiStatusBannerProps) {
  const { title, className } = labels[source];

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm ${className}`}
      role="status"
    >
      <p className="font-semibold">{title}</p>
      {message && <p className="mt-1 text-xs opacity-90">{message}</p>}
      {source === "demo" && !message && (
        <p className="mt-1 text-xs opacity-90">
          A imagem &quot;depois&quot; é a mesma foto enviada. Adicione{" "}
          <code className="text-xs">GOOGLE_API_KEY</code> no .env.local para
          transformação real.
        </p>
      )}
    </div>
  );
}
