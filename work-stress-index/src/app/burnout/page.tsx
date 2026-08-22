import { Suspense } from "react";
import { BurnoutApp } from "./BurnoutApp";

export default function BurnoutPage() {
  return (
    <Suspense fallback={null}>
      <BurnoutApp />
    </Suspense>
  );
}
