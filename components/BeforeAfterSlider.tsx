"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
}: BeforeAfterSliderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md aspect-[4/3] w-full">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeImage}
            alt="Antes"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterImage}
            alt="Depois"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        }
        className="h-full w-full"
        handle={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border-2 border-forest">
            <div className="flex gap-0.5">
              <div className="h-3 w-0.5 bg-forest rounded" />
              <div className="h-3 w-0.5 bg-forest rounded" />
            </div>
          </div>
        }
      />
    </div>
  );
}
