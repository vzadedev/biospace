"use client";

import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  message: string;
}

export function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream/95 backdrop-blur-sm px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-forest" />
        <p className="text-lg font-semibold text-charcoal">{message}</p>
        <p className="text-sm text-gray-500">Isso pode levar alguns segundos...</p>
      </div>
    </div>
  );
}
