"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getProjectById } from "@/lib/storage";
import type { Project } from "@/lib/types";

function subscribe(callback: () => void) {
  window.addEventListener("biospace-projects-updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("biospace-projects-updated", callback);
    window.removeEventListener("storage", callback);
  };
}

export function useProject(id: string): Project | undefined {
  const getSnapshot = useCallback(() => getProjectById(id), [id]);
  const getServerSnapshot = useCallback(() => undefined as Project | undefined, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
