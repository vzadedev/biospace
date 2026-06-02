"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { MoodSelector } from "@/components/MoodSelector";
import { PageHeader } from "@/components/PageHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { StyleSelector } from "@/components/StyleSelector";
import { useFlowData } from "@/hooks/useFlowData";
import { useIsClient } from "@/hooks/useIsClient";
import { setFlowData } from "@/lib/flow";
import type { DecorationMood, DecorationStyle } from "@/lib/types";

function PreferencesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isClient = useIsClient();
  const flowData = useFlowData();
  const step = searchParams.get("step") === "mood" ? "mood" : "style";

  const [style, setStyle] = useState<DecorationStyle | null>(
    () => flowData.style
  );
  const [mood, setMood] = useState<DecorationMood | null>(() => flowData.mood);

  const activeStyle = style ?? flowData.style;
  const activeMood = mood ?? flowData.mood;

  useEffect(() => {
    if (isClient && !flowData.originalImage) {
      router.replace("/project/new");
    }
  }, [isClient, flowData.originalImage, router]);

  const handleStyleContinue = () => {
    if (!activeStyle) return;
    setFlowData({ style: activeStyle });
    router.push("/project/preferences?step=mood");
  };

  const handleMoodContinue = () => {
    if (!activeMood) return;
    setFlowData({ mood: activeMood });
    router.push("/result");
  };

  if (step === "style") {
    return (
      <AppShell>
        <ProgressBar currentStep={2} />
        <div className="mt-4">
          <PageHeader title="Novo projeto" backHref="/project/new" />
        </div>
        <h2 className="mt-6 mb-4 text-lg font-bold text-charcoal leading-snug">
          Qual estilo de decoração você mais gosta?
        </h2>
        <StyleSelector
          value={activeStyle}
          onChange={(s) => {
            setStyle(s);
            setFlowData({ style: s });
          }}
        />
        <div className="mt-8">
          <Button disabled={!activeStyle} onClick={handleStyleContinue}>
            Continuar
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <ProgressBar currentStep={3} />
      <div className="mt-4">
        <PageHeader
          title="Novo projeto"
          backHref="/project/preferences?step=style"
        />
      </div>
      <h2 className="mt-6 mb-4 text-lg font-bold text-charcoal leading-snug">
        Qual sensação você quer para o seu ambiente?
      </h2>
      <MoodSelector
        value={activeMood}
        onChange={(m) => {
          setMood(m);
          setFlowData({ mood: m });
        }}
      />
      <div className="mt-8">
        <Button disabled={!activeMood} onClick={handleMoodContinue}>
          Gerar projeto
        </Button>
      </div>
    </AppShell>
  );
}

export default function PreferencesPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <div className="h-40 animate-pulse rounded-2xl bg-sage/50" />
        </AppShell>
      }
    >
      <PreferencesContent />
    </Suspense>
  );
}
