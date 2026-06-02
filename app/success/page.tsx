"use client";

import { Check, Leaf } from "lucide-react";
import { Button } from "@/components/Button";

export default function SuccessPage() {
  return (
    <div className="relative min-h-screen bg-cream flex flex-col items-center justify-center px-6 overflow-hidden">
      <Leaf className="absolute top-8 left-6 h-16 w-16 text-sage rotate-[-20deg] opacity-60" />
      <Leaf className="absolute top-12 right-8 h-12 w-12 text-sage rotate-[30deg] opacity-50" />
      <Leaf className="absolute bottom-24 left-10 h-14 w-14 text-sage rotate-[15deg] opacity-40" />
      <Leaf className="absolute bottom-16 right-6 h-20 w-20 text-sage rotate-[-25deg] opacity-50" />

      <div className="relative z-10 flex flex-col items-center text-center animate-fade-in max-w-sm">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-forest shadow-lg">
          <Check className="h-12 w-12 text-white stroke-[3]" />
        </div>
        <h1 className="text-2xl font-bold text-charcoal">Projeto salvo!</h1>
        <p className="mt-2 text-gray-500">
          Seu projeto foi salvo com sucesso.
        </p>
        <div className="mt-10 w-full space-y-3">
          <Button variant="secondary" href="/projects">
            Ver meus projetos
          </Button>
          <Button href="/project/new">Criar novo projeto</Button>
        </div>
      </div>
    </div>
  );
}
