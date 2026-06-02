"use client";

import { useCallback, useSyncExternalStore } from "react";
import { EMPTY_PROJECTS, getProjects } from "@/lib/storage";
import type { Project } from "@/lib/types";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("biospace-projects-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("biospace-projects-updated", callback);
  };
}

export function useProjects(): Project[] {
  const getSnapshot = useCallback(() => getProjects(), []);
  const getServerSnapshot = useCallback(() => EMPTY_PROJECTS, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
