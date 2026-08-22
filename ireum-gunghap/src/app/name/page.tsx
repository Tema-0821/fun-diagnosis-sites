import { Suspense } from "react";
import { CompatibilityApp } from "./CompatibilityApp";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <CompatibilityApp />
    </Suspense>
  );
}
