"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Shield } from "lucide-react";
import { hasUserProfile } from "@/lib/user";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = hasUserProfile() ? "/" : "/welcome";
      router.replace(next);
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-forest px-8 text-center overflow-hidden">
      <div className="relative z-10 animate-fade-in flex flex-col items-center gap-6">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-forest-light/50 border border-white/20">
          <Shield className="absolute h-20 w-20 text-white/20" strokeWidth={1} />
          <Leaf className="h-12 w-12 text-sage" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-white">
            BIOSPACE AI
          </h1>
          <p className="mt-3 text-sm text-white/80 max-w-xs leading-relaxed">
            Decoração biofílica inteligente para ambientes reais
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-48 opacity-30"
        style={{
          background:
            "linear-gradient(to top, rgba(45,106,79,0.8), transparent), url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop') center/cover",
        }}
        aria-hidden
      />
    </div>
  );
}
