"use client";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/Button";
import { useProjects } from "@/hooks/useProjects";

export default function ProjectsPage() {
  const projects = useProjects();

  return (
    <AppShell>
      <PageHeader title="Meus projetos" backHref="/" />

      {projects.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-6">Você ainda não tem projetos salvos.</p>
          <Button href="/project/new">Criar primeiro projeto</Button>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
