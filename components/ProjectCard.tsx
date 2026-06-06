"use client";

import Link from "next/link";
import { DataImage } from "@/components/DataImage";
import type { Project } from "@/lib/types";
import { formatRelativeTime } from "@/lib/storage";
import { isValidImageDataUrl } from "@/lib/image-compress";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const image =
    (isValidImageDataUrl(project.generatedImage)
      ? project.generatedImage
      : null) ||
    project.originalImage;

  return (
    <Link
      href={`/project/${project.id}`}
      className="flex gap-4 rounded-2xl bg-white p-3 shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
    >
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
        <DataImage src={image} alt={project.name} fill />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <h3 className="font-semibold text-charcoal truncate">{project.name}</h3>
        <p className="text-sm text-gray-500">
          {formatRelativeTime(project.createdAt)}
          {project.items?.length ? ` · ${project.items.length} itens` : ""}
        </p>
      </div>
    </Link>
  );
}
