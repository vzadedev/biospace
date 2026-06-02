import { DECORATION_CATALOG } from "./constants";
import type {
  DecorationItem,
  DecorationMood,
  DecorationStyle,
  Project,
} from "./types";

const STYLE_ITEM_IDS: Record<DecorationStyle, string[]> = {
  moderno: ["plant-monstera", "vase-minimal", "lamp-floor", "shelf-floating"],
  minimalista: ["plant-snake", "vase-white", "rug-neutral", "lamp-pendant"],
  rustico: ["plant-pothos", "vase-terracotta", "rug-jute", "bench-wood"],
  boho: ["plant-monstera", "macrame-hanger", "rug-jute", "vase-terracotta"],
  industrial: ["plant-snake", "lamp-pendant", "shelf-floating", "pot-concrete"],
};

const MOOD_ITEM_IDS: Record<DecorationMood, string[]> = {
  relaxamento: ["plant-pothos", "lamp-floor", "rug-neutral"],
  produtividade: ["plant-snake", "lamp-pendant", "shelf-floating"],
  aconchego: ["plant-pothos", "rug-jute", "lamp-floor"],
  sofisticacao: ["plant-monstera", "vase-minimal", "lamp-pendant"],
  natureza: ["plant-monstera", "macrame-hanger", "vase-terracotta", "plant-pothos"],
};

const catalogMap = new Map(DECORATION_CATALOG.map((item) => [item.id, item]));

function pickItems(ids: string[], limit: number): DecorationItem[] {
  const items: DecorationItem[] = [];
  for (const id of ids) {
    const item = catalogMap.get(id);
    if (item && !items.some((i) => i.id === item.id)) {
      items.push(item);
    }
    if (items.length >= limit) break;
  }
  return items;
}

/** Sugere 3–4 itens usados na decoração com base no estilo e no mood */
export function getDecorationItems(
  style: DecorationStyle,
  mood: DecorationMood,
  limit = 4
): DecorationItem[] {
  const combined = [...STYLE_ITEM_IDS[style], ...MOOD_ITEM_IDS[mood]];
  const items = pickItems(combined, limit);

  if (items.length < limit) {
    const fallback = pickItems(
      DECORATION_CATALOG.map((i) => i.id),
      limit
    );
    for (const item of fallback) {
      if (!items.some((i) => i.id === item.id)) items.push(item);
      if (items.length >= limit) break;
    }
  }

  return items.slice(0, limit);
}

export function ensureProjectItems(
  project: Pick<Project, "style" | "mood" | "items">
): DecorationItem[] {
  if (project.items?.length) return project.items;
  return getDecorationItems(project.style, project.mood);
}
