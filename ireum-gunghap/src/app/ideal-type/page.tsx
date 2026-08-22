import { Suspense } from "react";
import { IdealTypeApp } from "./IdealTypeApp";

export default function IdealTypePage() {
  return (
    <Suspense fallback={null}>
      <IdealTypeApp />
    </Suspense>
  );
}
