"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { useIsClient } from "@/hooks/useIsClient";
import { useProjects } from "@/hooks/useProjects";
import { useHasUserProfile, useUserName } from "@/hooks/useUserName";
import { clearFlowData } from "@/lib/flow";
import { hasUserProfile } from "@/lib/user";

export default function HomePage() {
  const router = useRouter();
  const isClient = useIsClient();
  const hasUser = useHasUserProfile();
  const userName = useUserName();
  const projects = useProjects();

  useEffect(() => {
    if (!isClient) return;

    if (!hasUserProfile()) {
      router.replace("/welcome");
      return;
    }

    const seen = sessionStorage.getItem("biospace_splash_seen");
    if (!seen) {
      sessionStorage.setItem("biospace_splash_seen", "1");
      router.replace("/splash");
    }
  }, [isClient, router]);

  const recent = projects.slice(0, 3);

  if (!isClient || !hasUser) {
    return (
      <AppShell>
        <div className="h-40 animate-pulse rounded-2xl bg-sage/50" />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">
            Olá, {userName}! 🌿
          </h1>
          <p className="mt-1 text-sm text-gray-500 max-w-xs">
            Transforme seus ambientes com decoração biofílica inteligente
          </p>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5 text-charcoal" />
        </button>
      </header>

      <div className="space-y-3 mb-8">
        <Button href="/project/new" onClick={() => clearFlowData()}>
          Novo projeto
        </Button>
        <Button variant="secondary" href="/projects">
          Meus projetos
          {projects.length > 0 && (
            <span className="ml-1 rounded-full bg-forest/10 px-2 py-0.5 text-xs">
              {projects.length}
            </span>
          )}
        </Button>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-charcoal">Projetos recentes</h2>
          {projects.length > 0 && (
            <Link
              href="/projects"
              className="text-sm font-medium text-forest hover:underline"
            >
              Ver todos
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="rounded-2xl bg-white border border-dashed border-gray-200 p-8 text-center">
            <p className="text-sm text-gray-500">
              Nenhum projeto ainda. Crie seu primeiro redesign!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recent.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
