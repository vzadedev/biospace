"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { formatRelativeTime } from "@/lib/storage";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const image = project.generatedImage || project.originalImage;

  return (
    <Link
      href={`/project/${project.id}`}
      className="flex gap-4 rounded-2xl bg-white p-3 shadow-sm border border-gray-100 transition-shadow hover:shadow-md"
    >
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={project.name}
          fill
          className="object-cover"
          unoptimized={image.startsWith("data:")}
        />
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
