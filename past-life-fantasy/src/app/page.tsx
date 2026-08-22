import { Suspense } from "react";
import { PastLifeApp } from "./PastLifeApp";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <PastLifeApp />
    </Suspense>
  );
}
