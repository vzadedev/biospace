"use client";

import { useParams, useRouter } from "next/navigation";
import { DataImage } from "@/components/DataImage";
import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { BeforeAfterTabs } from "@/components/BeforeAfterTabs";
import { Button } from "@/components/Button";
import { DecorationItemsList } from "@/components/DecorationItemsList";
import { PageHeader } from "@/components/PageHeader";
import { ensureProjectItems } from "@/lib/decoration-items";
import { STYLE_LABELS, MOOD_LABELS } from "@/lib/constants";
import { useIsClient } from "@/hooks/useIsClient";
import { useProject } from "@/hooks/useProject";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const isClient = useIsClient();
  const id = params.id as string;
  const project = useProject(id);
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");

  const notFound = isClient && project === undefined;

  useEffect(() => {
    if (notFound) router.replace("/projects");
  }, [notFound, router]);

  if (!isClient || project === undefined) {
    return (
      <AppShell>
        <div className="h-64 animate-pulse rounded-2xl bg-sage/50" />
      </AppShell>
    );
  }

  const items = ensureProjectItems(project);

  return (
    <AppShell>
      <PageHeader title={project.name} backHref="/projects" />

      <p className="mt-1 text-sm text-gray-500">
        {STYLE_LABELS[project.style]} · {MOOD_LABELS[project.mood]}
      </p>

      <div className="mt-4 space-y-4">
        <BeforeAfterTabs active={activeTab} onChange={setActiveTab} />
        {activeTab === "after" ? (
          <BeforeAfterSlider
            beforeImage={project.originalImage}
            afterImage={project.generatedImage}
          />
        ) : (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md">
            <DataImage src={project.originalImage} alt="Antes" fill />
          </div>
        )}

        <DecorationItemsList items={items} />
      </div>

      <div className="mt-6">
        <Button
          variant="secondary"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: project.name,
                text: "Projeto BioSpace AI",
              });
            }
          }}
        >
          <Share2 className="h-4 w-4" />
          Compartilhar
        </Button>
      </div>
    </AppShell>
  );
}
