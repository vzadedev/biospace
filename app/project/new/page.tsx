"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { ImageUpload } from "@/components/ImageUpload";
import { PageHeader } from "@/components/PageHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { TextField } from "@/components/TextField";
import { TipsBox } from "@/components/TipsBox";
import { useFlowData } from "@/hooks/useFlowData";
import { setFlowData } from "@/lib/flow";

export default function NewProjectPage() {
  const router = useRouter();
  const flowData = useFlowData();
  const [preview, setPreview] = useState<string | null>(
    () => flowData.originalImage || null
  );
  const [roomName, setRoomName] = useState(flowData.projectName ?? "");

  const displayPreview = preview ?? (flowData.originalImage || null);

  const handleContinue = () => {
    if (!displayPreview) return;
    setFlowData({
      originalImage: displayPreview,
      projectName: roomName.trim() || "Meu ambiente",
      projectId: flowData.projectId ?? crypto.randomUUID(),
    });
    router.push("/project/preferences?step=style");
  };

  return (
    <AppShell>
      <ProgressBar currentStep={1} />
      <div className="mt-4">
        <PageHeader title="Novo projeto" backHref="/" />
      </div>

      <div className="mt-6 space-y-6">
        <TextField
          label="Nome do ambiente"
          placeholder="Ex: Sala de estar"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          hint="Aparece em Meus projetos"
          maxLength={50}
        />
        <ImageUpload
          preview={displayPreview}
          onImageSelect={(base64) => {
            setPreview(base64);
            setFlowData({ originalImage: base64 });
          }}
        />
        <TipsBox />
        <Button disabled={!displayPreview} onClick={handleContinue}>
          Continuar
        </Button>
      </div>
    </AppShell>
  );
}
