import { Suspense } from "react";
import { StressApp } from "./StressApp";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <StressApp />
    </Suspense>
  );
}
