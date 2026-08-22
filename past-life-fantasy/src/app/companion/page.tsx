import { Suspense } from "react";
import { CompanionApp } from "./CompanionApp";

export default function CompanionPage() {
  return (
    <Suspense fallback={null}>
      <CompanionApp />
    </Suspense>
  );
}
