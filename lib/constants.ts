import type { DecorationItem, DecorationMood, DecorationStyle } from "./types";

function itemImage(seed: string): string {
  return `https://picsum.photos/seed/biospace-${seed}/120/120`;
}

export const STORAGE_KEY = "biospace_projects";
export const FLOW_KEY = "biospace_flow";
export const USER_PROFILE_KEY = "biospace_user";

export const DECORATION_CATALOG: DecorationItem[] = [
  {
    id: "plant-monstera",
    name: "Costela-de-adão",
    category: "Planta",
    image: itemImage("plant-monstera"),
    type: "plant",
  },
  {
    id: "plant-pothos",
    name: "Jiboia",
    category: "Planta",
    image: itemImage("plant-pothos"),
    type: "plant",
  },
  {
    id: "plant-snake",
    name: "Lança de São Jorge",
    category: "Planta",
    image: itemImage("plant-snake"),
    type: "plant",
  },
  {
    id: "vase-terracotta",
    name: "Vaso terracota",
    category: "Vaso",
    image: itemImage("vase-terracotta"),
    type: "vase",
  },
  {
    id: "vase-minimal",
    name: "Vaso cerâmica branco",
    category: "Vaso",
    image: itemImage("vase-minimal"),
    type: "vase",
  },
  {
    id: "vase-white",
    name: "Vaso minimalista",
    category: "Vaso",
    image: itemImage("vase-white"),
    type: "vase",
  },
  {
    id: "lamp-floor",
    name: "Luminária de chão",
    category: "Iluminação",
    image: itemImage("lamp-floor"),
    type: "lighting",
  },
  {
    id: "lamp-pendant",
    name: "Pendente natural",
    category: "Iluminação",
    image: itemImage("lamp-pendant"),
    type: "lighting",
  },
  {
    id: "rug-jute",
    name: "Tapete sisal",
    category: "Têxtil",
    image: itemImage("rug-jute"),
    type: "textile",
  },
  {
    id: "rug-neutral",
    name: "Tapete neutro",
    category: "Têxtil",
    image: itemImage("rug-neutral"),
    type: "textile",
  },
  {
    id: "shelf-floating",
    name: "Prateleiras flutuantes",
    category: "Móvel",
    image: itemImage("shelf-floating"),
    type: "furniture",
  },
  {
    id: "macrame-hanger",
    name: "Suporte macramê",
    category: "Acessório",
    image: itemImage("macrame-hanger"),
    type: "furniture",
  },
  {
    id: "bench-wood",
    name: "Banco de madeira",
    category: "Móvel",
    image: itemImage("bench-wood"),
    type: "furniture",
  },
  {
    id: "pot-concrete",
    name: "Vaso cimento",
    category: "Vaso",
    image: itemImage("pot-concrete"),
    type: "vase",
  },
];

export const STYLES: {
  id: DecorationStyle;
  label: string;
  image: string;
}[] = [
  {
    id: "moderno",
    label: "Moderno",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&h=200&fit=crop",
  },
  {
    id: "minimalista",
    label: "Minimalista",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200&h=200&fit=crop",
  },
  {
    id: "rustico",
    label: "Rústico",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=200&h=200&fit=crop",
  },
  {
    id: "boho",
    label: "Boho",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
  },
  {
    id: "industrial",
    label: "Industrial",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop",
  },
];

export const MOODS: {
  id: DecorationMood;
  label: string;
  icon: "lotus" | "lightbulb" | "house" | "trophy" | "leaf";
}[] = [
  {
    id: "relaxamento",
    label: "Bem-estar e relaxamento",
    icon: "lotus",
  },
  {
    id: "produtividade",
    label: "Mais energia e produtividade",
    icon: "lightbulb",
  },
  {
    id: "aconchego",
    label: "Aconchego",
    icon: "house",
  },
  {
    id: "sofisticacao",
    label: "Sofisticação",
    icon: "trophy",
  },
  {
    id: "natureza",
    label: "Conexão com a natureza",
    icon: "leaf",
  },
];

export const STYLE_LABELS: Record<DecorationStyle, string> = {
  moderno: "Moderno",
  minimalista: "Minimalista",
  rustico: "Rústico",
  boho: "Boho",
  industrial: "Industrial",
};

export const MOOD_LABELS: Record<DecorationMood, string> = {
  relaxamento: "Bem-estar e relaxamento",
  produtividade: "Mais energia e produtividade",
  aconchego: "Aconchego",
  sofisticacao: "Sofisticação",
  natureza: "Conexão com a natureza",
};

export const MOCK_GENERATED_IMAGE =
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop";

export const UPLOAD_TIPS = [
  "Ambiente bem iluminado",
  "Mostre o ambiente completo",
  "Evite filtros nas fotos",
];

export const PLANT_SUGGESTIONS = [
  {
    id: "1",
    name: "Jiboia",
    scientific: "Epipremnum aureum",
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32d8de0?w=120&h=120&fit=crop",
    tags: ["Fácil manutenção", "Purifica o ar"],
  },
  {
    id: "2",
    name: "Lança de São Jorge",
    scientific: "Sansevieria trifasciata",
    image:
      "https://images.unsplash.com/photo-1593482892291-2d5479a4e8d0?w=120&h=120&fit=crop",
    tags: ["Fácil manutenção", "Purifica o ar"],
  },
  {
    id: "3",
    name: "Zamioculca",
    scientific: "Zamioculcas zamiifolia",
    image:
      "https://images.unsplash.com/photo-1614594975524-2f8f8c9c8a0e?w=120&h=120&fit=crop",
    tags: ["Fácil manutenção", "Pouca água"],
  },
  {
    id: "4",
    name: "Costela-de-adão",
    scientific: "Monstera deliciosa",
    image:
      "https://images.unsplash.com/photo-1614594975524-2f8f8c9c8a0e?w=120&h=120&fit=crop",
    tags: ["Destaque visual", "Ambientes amplos"],
  },
];

export const PROJECT_ITEMS = [
  {
    id: "1",
    name: "Vaso cerâmica terracota",
    price: 89.9,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d024d4de?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "Suporte de parede para plantas",
    price: 129.0,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    name: "Jiboia média",
    price: 45.0,
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32d8de0?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    name: "Tapete sisal natural",
    price: 199.0,
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=100&h=100&fit=crop",
  },
];
