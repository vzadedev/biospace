export type DecorationStyle =
  | "moderno"
  | "minimalista"
  | "rustico"
  | "boho"
  | "industrial";

export type DecorationMood =
  | "relaxamento"
  | "produtividade"
  | "aconchego"
  | "sofisticacao"
  | "natureza";

export type DecorationItemType = "plant" | "vase" | "furniture" | "lighting" | "textile";

export interface DecorationItem {
  id: string;
  name: string;
  category: string;
  image: string;
  type: DecorationItemType;
}

export interface Project {
  id: string;
  name: string;
  originalImage: string;
  generatedImage: string;
  style: DecorationStyle;
  mood: DecorationMood;
  items: DecorationItem[];
  createdAt: number;
}

export interface ProjectFormData {
  projectId?: string;
  originalImage: string;
  style: DecorationStyle | null;
  mood: DecorationMood | null;
  projectName?: string;
}

export interface UserProfile {
  name: string;
}
