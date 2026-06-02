import { FLOW_KEY } from "./constants";
import { clearResultCache, clearResultImages } from "./result-cache";
import type { ProjectFormData } from "./types";

const defaultFlow: ProjectFormData = {
  projectId: undefined,
  originalImage: "",
  style: null,
  mood: null,
  projectName: "",
};

/** Stable default for SSR / useSyncExternalStore server snapshot */
export const DEFAULT_FLOW: ProjectFormData = defaultFlow;

let cacheRaw: string | null = null;
let cache: ProjectFormData = defaultFlow;

function readFlowFromStorage(): ProjectFormData {
  if (typeof window === "undefined") return defaultFlow;

  const raw = sessionStorage.getItem(FLOW_KEY);
  const key = raw ?? "";

  if (cacheRaw === key) return cache;

  cacheRaw = key;

  if (!raw) {
    cache = defaultFlow;
    return cache;
  }

  try {
    cache = { ...defaultFlow, ...JSON.parse(raw) };
    return cache;
  } catch {
    cache = defaultFlow;
    return cache;
  }
}

export function getFlowData(): ProjectFormData {
  return readFlowFromStorage();
}

export function setFlowData(data: Partial<ProjectFormData>): void {
  if (typeof window === "undefined") return;

  const merged = { ...getFlowData(), ...data };
  const json = JSON.stringify(merged);

  sessionStorage.setItem(FLOW_KEY, json);
  cacheRaw = json;
  cache = merged;

  window.dispatchEvent(new Event("biospace-flow-updated"));
}

export function clearFlowData(): void {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(FLOW_KEY);
  clearResultCache();
  clearResultImages();
  cacheRaw = "";
  cache = defaultFlow;

  window.dispatchEvent(new Event("biospace-flow-updated"));
}
