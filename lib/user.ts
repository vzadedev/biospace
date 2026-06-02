import { USER_PROFILE_KEY } from "./constants";
import type { UserProfile } from "./types";

const DEFAULT_PROFILE: UserProfile = { name: "" };

let cacheRaw: string | null = null;
let cache: UserProfile = DEFAULT_PROFILE;

export function getUserProfile(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;

  const raw = localStorage.getItem(USER_PROFILE_KEY);
  const key = raw ?? "";

  if (cacheRaw === key) return cache;

  cacheRaw = key;

  if (!raw) {
    cache = DEFAULT_PROFILE;
    return cache;
  }

  try {
    const parsed = JSON.parse(raw) as UserProfile;
    cache = parsed?.name ? { name: parsed.name.trim() } : DEFAULT_PROFILE;
    return cache;
  } catch {
    cache = DEFAULT_PROFILE;
    return cache;
  }
}

export function getUserName(): string {
  return getUserProfile().name;
}

export function hasUserProfile(): boolean {
  return getUserName().length > 0;
}

export function setUserName(name: string): void {
  if (typeof window === "undefined") return;

  const profile: UserProfile = { name: name.trim() };
  const json = JSON.stringify(profile);

  localStorage.setItem(USER_PROFILE_KEY, json);
  cacheRaw = json;
  cache = profile;

  window.dispatchEvent(new Event("biospace-user-updated"));
}
