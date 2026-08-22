import { Suspense } from "react";
import { FortuneApp } from "./FortuneApp";

export default function FortunePage() {
  return (
    <Suspense fallback={null}>
      <FortuneApp />
    </Suspense>
  );
}
