"use client";

import { ReactCompareSlider } from "react-compare-slider";
import { CompareImage } from "./CompareImage";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
}: BeforeAfterSliderProps) {
  return (
    <div
      className="compare-slider-root relative w-full overflow-hidden rounded-2xl shadow-md aspect-[4/3]"
      style={{ touchAction: "none" }}
    >
      <ReactCompareSlider
        itemOne={<CompareImage src={beforeImage} alt="Antes" />}
        itemTwo={<CompareImage src={afterImage} alt="Depois" />}
        className="h-full w-full"
        onlyHandleDraggable={false}
        changePositionOnHover={false}
        transition="0.1s ease-out"
        handle={
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border-2 border-forest"
            style={{ touchAction: "none" }}
            aria-hidden
          >
            <div className="flex gap-1">
              <div className="h-4 w-0.5 bg-forest rounded-full" />
              <div className="h-4 w-0.5 bg-forest rounded-full" />
            </div>
          </div>
        }
        style={{
          width: "100%",
          height: "100%",
          touchAction: "none",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
      />
      <p className="pointer-events-none absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/90 drop-shadow-md md:hidden">
        Arraste para comparar · ou use as abas Antes/Depois
      </p>
    </div>
  );
}
