import { Suspense } from "react";
import { LoveStyleApp } from "./LoveStyleApp";

export default function LoveStylePage() {
  return (
    <Suspense fallback={null}>
      <LoveStyleApp />
    </Suspense>
  );
}
