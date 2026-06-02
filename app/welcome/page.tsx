"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf } from "lucide-react";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { setUserName } from "@/lib/user";

export default function WelcomePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setUserName(trimmed);
    router.replace("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream px-6 py-12">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sage">
            <Leaf className="h-8 w-8 text-forest" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal">Bem-vindo ao BioSpace AI</h1>
          <p className="mt-2 text-sm text-gray-500">
            Como podemos te chamar? Seu nome aparece na home e nos projetos salvos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Seu nome"
            placeholder="Ex: Camila"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            autoComplete="given-name"
            maxLength={40}
          />
          <Button type="submit" disabled={!name.trim()}>
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
