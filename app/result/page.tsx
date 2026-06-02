"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DataImage } from "@/components/DataImage";
import { Check, Heart, Share2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AiStatusBanner } from "@/components/AiStatusBanner";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { BeforeAfterTabs } from "@/components/BeforeAfterTabs";
import { Button } from "@/components/Button";
import { DecorationItemsList } from "@/components/DecorationItemsList";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { PageHeader } from "@/components/PageHeader";
import { generateDesign, type AiSource } from "@/lib/ai";
import { clearFlowData, getFlowData } from "@/lib/flow";
import { saveCurrentProject } from "@/lib/project-save";
import {
  buildFlowKey,
  clearResultCache,
  clearResultImages,
  getResultCacheMeta,
  getResultImages,
  setResultCacheMeta,
  setResultImages,
} from "@/lib/result-cache";
import type { DecorationItem } from "@/lib/types";

const LOADING_MESSAGES = [
  "Analisando ambiente...",
  "Aplicando estilo...",
  "Gerando design...",
];

export default function ResultPage() {
  const router = useRouter();
  const generationIdRef = useRef(0);

  const [generatedImage, setGeneratedImage] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [decorationItems, setDecorationItems] = useState<DecorationItem[]>([]);
  const [aiSource, setAiSource] = useState<AiSource>("demo");
  const [aiMessage, setAiMessage] = useState<string>();
  const [saveWarning, setSaveWarning] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");
  const [saved, setSaved] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const runId = ++generationIdRef.current;
    const isActive = () => generationIdRef.current === runId;

    const flow = getFlowData();
    if (!flow.originalImage || !flow.style || !flow.mood) {
      router.replace("/project/new");
      return;
    }

    const flowKey = buildFlowKey(
      flow.originalImage,
      flow.style,
      flow.mood
    );

    const memory = getResultImages(flowKey);
    const meta = getResultCacheMeta();

    if (memory && meta?.flowKey === flowKey) {
      setOriginalImage(memory.originalImage);
      setGeneratedImage(memory.generatedImage);
      setDecorationItems(meta.items);
      setAiSource(meta.source);
      setAiMessage(meta.message);
      setSaved(true);
      setLoading(false);
      return;
    }

    setOriginalImage(flow.originalImage);

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (!isActive()) return;
      messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[messageIndex]);
    }, 2000);

    generateDesign(flow.originalImage, flow.style, flow.mood)
      .then(({ imageUrl, source, message, items }) => {
        if (!isActive()) return;

        setGeneratedImage(imageUrl);
        setAiSource(source);
        setAiMessage(message);
        setDecorationItems(items);
        setResultImages(flowKey, flow.originalImage, imageUrl);
        setResultCacheMeta({
          flowKey,
          style: flow.style!,
          mood: flow.mood!,
          items,
          source,
          message,
        });

        // Mostra o resultado imediatamente — não espera compressão/save
        setLoading(false);

        saveCurrentProject({
          originalImage: flow.originalImage,
          generatedImage: imageUrl,
          style: flow.style!,
          mood: flow.mood!,
          items,
        }).then((saveResult) => {
          if (!isActive()) return;
          setSaved(saveResult.saved);
          if (saveResult.warning) setSaveWarning(saveResult.warning);
        });
      })
      .catch((err) => {
        console.error("[result]", err);
        if (isActive()) router.replace("/project/new");
      })
      .finally(() => {
        clearInterval(messageInterval);
        if (isActive()) setLoading(false);
      });

    return () => clearInterval(messageInterval);
  }, [router]);

  const handleDone = () => {
    clearFlowData();
    clearResultCache();
    clearResultImages();
    router.push("/success");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "BioSpace AI",
        text: "Confira meu projeto de decoração biofílica!",
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return <LoadingOverlay message={loadingMessage} />;
  }

  if (!originalImage || !generatedImage) {
    return (
      <AppShell>
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-charcoal font-medium">Carregando resultado…</p>
          <Button variant="secondary" href="/project/new">
            Voltar
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader
        title="Seu projeto"
        backHref="/"
        rightAction={
          <button
            type="button"
            onClick={() => setFavorited(!favorited)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-sage/50"
            aria-label="Favoritar"
          >
            <Heart
              className={`h-5 w-5 ${favorited ? "fill-red-500 text-red-500" : "text-charcoal"}`}
            />
          </button>
        }
      />

      <div className="mt-4 space-y-4">
        <AiStatusBanner source={aiSource} message={aiMessage} />

        {saved && (
          <p className="flex items-center gap-2 rounded-xl bg-sage/60 px-3 py-2 text-sm text-forest">
            <Check className="h-4 w-4 shrink-0" />
            Projeto salvo em Meus projetos
          </p>
        )}

        {saveWarning && (
          <p className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-900">
            {saveWarning}
          </p>
        )}

        <BeforeAfterTabs active={activeTab} onChange={setActiveTab} />

        {activeTab === "after" ? (
          <BeforeAfterSlider
            beforeImage={originalImage}
            afterImage={generatedImage}
          />
        ) : (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md">
            <DataImage src={originalImage} alt="Antes" fill />
          </div>
        )}

        {activeTab === "after" && (
          <p className="text-center text-xs text-gray-500 md:block hidden">
            Arraste o controle para comparar antes e depois
          </p>
        )}

        <DecorationItemsList items={decorationItems} />
      </div>

      <div className="mt-6 flex gap-3">
        <Button fullWidth onClick={handleDone} className="!w-auto flex-1">
          <Check className="h-4 w-4" />
          Concluir
        </Button>
        <Button fullWidth onClick={handleShare} className="!w-auto flex-1">
          <Share2 className="h-4 w-4" />
          Compartilhar
        </Button>
      </div>

      <div className="mt-4">
        <Button variant="secondary" href="/projects">
          Ver meus projetos
        </Button>
      </div>
    </AppShell>
  );
}
