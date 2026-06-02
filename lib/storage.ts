import { STORAGE_KEY } from "./constants";
import { getDecorationItems } from "./decoration-items";
import type { Project } from "./types";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** Stable empty array for snapshots and SSR */
export const EMPTY_PROJECTS: Project[] = [];

let cacheRaw: string | null = null;
let cache: Project[] = EMPTY_PROJECTS;

export function getProjects(): Project[] {
  if (!isBrowser()) return EMPTY_PROJECTS;

  const raw = localStorage.getItem(STORAGE_KEY);
  const key = raw ?? "";

  if (cacheRaw === key) return cache;

  cacheRaw = key;

  if (!raw) {
    cache = EMPTY_PROJECTS;
    return cache;
  }

  try {
    const parsed = JSON.parse(raw) as Project[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      cache = EMPTY_PROJECTS;
      return cache;
    }
    cache = [...parsed]
      .map(normalizeProject)
      .sort((a, b) => b.createdAt - a.createdAt);
    return cache;
  } catch {
    cache = EMPTY_PROJECTS;
    return cache;
  }
}

function normalizeProject(raw: Project): Project {
  return {
    ...raw,
    items:
      Array.isArray(raw.items) && raw.items.length > 0
        ? raw.items
        : getDecorationItems(raw.style, raw.mood),
  };
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}

export function saveProject(project: Project): void {
  if (!isBrowser()) return;

  const projects = getProjects().filter((p) => p.id !== project.id);
  projects.unshift(project);

  const json = JSON.stringify(projects);
  localStorage.setItem(STORAGE_KEY, json);
  cacheRaw = json;
  cache = projects;

  window.dispatchEvent(new Event("biospace-projects-updated"));
}

export function deleteProject(id: string): void {
  if (!isBrowser()) return;

  const projects = getProjects().filter((p) => p.id !== id);
  const json = JSON.stringify(projects);
  localStorage.setItem(STORAGE_KEY, json);
  cacheRaw = json;
  cache = projects.length > 0 ? projects : EMPTY_PROJECTS;

  window.dispatchEvent(new Event("biospace-projects-updated"));
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Agora mesmo";
  if (minutes < 60) return `Editado há ${minutes} min`;
  if (hours < 24) return `Editado há ${hours}h`;
  if (days === 1) return "Editado há 1 dia";
  return `Editado há ${days} dias`;
}
