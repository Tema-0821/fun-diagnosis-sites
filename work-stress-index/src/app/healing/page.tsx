import { Suspense } from "react";
import { HealingApp } from "./HealingApp";

export default function HealingPage() {
  return (
    <Suspense fallback={null}>
      <HealingApp />
    </Suspense>
  );
}
