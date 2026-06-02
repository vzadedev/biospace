"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getUserName } from "@/lib/user";

function subscribe(callback: () => void) {
  window.addEventListener("biospace-user-updated", callback);
  return () => window.removeEventListener("biospace-user-updated", callback);
}

export function useUserName(): string {
  const getSnapshot = useCallback(() => getUserName(), []);
  return useSyncExternalStore(subscribe, getSnapshot, () => "");
}

export function useHasUserProfile(): boolean {
  const name = useUserName();
  return name.length > 0;
}
