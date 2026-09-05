import { useSyncExternalStore } from "react";
import type { FinishId, PieceId, SizeId } from "@/content/site";

/**
 * One shared selection for the hero configurator AND the brief builder, so the
 * visitor is never asked the same thing twice. Module-level + useSyncExternalStore
 * keeps it dead simple and SSR-safe (server always sees the defaults).
 */
export type Config = { piece: PieceId; finish: FinishId; size: SizeId };

let state: Config = { piece: "living", finish: "walnut", size: "standard" };
const listeners = new Set<() => void>();

export const configStore = {
  get: (): Config => state,
  set: (patch: Partial<Config>) => {
    state = { ...state, ...patch };
    listeners.forEach((l) => l());
  },
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useConfig(): Config {
  return useSyncExternalStore(configStore.subscribe, configStore.get, configStore.get);
}
