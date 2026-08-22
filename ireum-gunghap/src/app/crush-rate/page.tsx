import { Suspense } from "react";
import { CrushRateApp } from "./CrushRateApp";

export default function CrushRatePage() {
  return (
    <Suspense fallback={null}>
      <CrushRateApp />
    </Suspense>
  );
}
