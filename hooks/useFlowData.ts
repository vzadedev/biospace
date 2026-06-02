"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_FLOW, getFlowData } from "@/lib/flow";

function subscribe(callback: () => void) {
  window.addEventListener("biospace-flow-updated", callback);
  return () => window.removeEventListener("biospace-flow-updated", callback);
}

export function useFlowData() {
  const getSnapshot = useCallback(() => getFlowData(), []);
  const getServerSnapshot = useCallback(() => DEFAULT_FLOW, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
