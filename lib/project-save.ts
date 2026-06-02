import { getDecorationItems } from "./decoration-items";
import { compressImageDataUrl } from "./image-compress";
import { getFlowData, setFlowData } from "./flow";
import { getProjectById, saveProject } from "./storage";
import type { DecorationItem, DecorationMood, DecorationStyle } from "./types";

export interface SaveCurrentProjectInput {
  originalImage: string;
  generatedImage: string;
  style: DecorationStyle;
  mood: DecorationMood;
  items?: DecorationItem[];
}

export interface SaveProjectResult {
  id: string;
  saved: boolean;
  warning?: string;
}

export async function saveCurrentProject(
  input: SaveCurrentProjectInput
): Promise<SaveProjectResult> {
  const flow = getFlowData();
  const id = flow.projectId ?? crypto.randomUUID();
  const existing = getProjectById(id);
  const items = input.items ?? getDecorationItems(input.style, input.mood);
  const name = flow.projectName?.trim() || existing?.name || "Meu ambiente";

  try {
    const [originalImage, generatedImage] = await Promise.all([
      compressImageDataUrl(input.originalImage),
      compressImageDataUrl(input.generatedImage),
    ]);

    saveProject({
      id,
      name,
      originalImage,
      generatedImage,
      style: input.style,
      mood: input.mood,
      items,
      createdAt: existing?.createdAt ?? Date.now(),
    });

    setFlowData({ projectId: id });
    return { id, saved: true };
  } catch (error) {
    const isQuota =
      error instanceof DOMException && error.name === "QuotaExceededError";

    console.error("[saveCurrentProject]", error);

    setFlowData({ projectId: id });
    return {
      id,
      saved: false,
      warning: isQuota
        ? "Imagens muito grandes para salvar neste navegador. O resultado ainda aparece aqui."
        : "Não foi possível salvar em Meus projetos agora.",
    };
  }
}
