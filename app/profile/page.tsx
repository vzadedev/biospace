"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { TextField } from "@/components/TextField";
import { useUserName } from "@/hooks/useUserName";
import { setUserName } from "@/lib/user";

export default function ProfilePage() {
  const currentName = useUserName();
  const [name, setName] = useState(currentName);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setUserName(trimmed);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell>
      <PageHeader title="Perfil" backHref="/" />

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sage">
          <User className="h-10 w-10 text-forest" />
        </div>

        <TextField
          label="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
        />

        <div className="mt-4">
          <Button onClick={handleSave} disabled={!name.trim()}>
            {saved ? "Salvo!" : "Salvar nome"}
          </Button>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-gray-400">
        Seus projetos ficam salvos neste dispositivo (localStorage).
      </p>
    </AppShell>
  );
}
