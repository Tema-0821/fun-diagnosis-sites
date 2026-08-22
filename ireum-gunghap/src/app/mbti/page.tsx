import { Suspense } from "react";
import { MbtiApp } from "./MbtiApp";

export default function MbtiPage() {
  return (
    <Suspense fallback={null}>
      <MbtiApp />
    </Suspense>
  );
}
