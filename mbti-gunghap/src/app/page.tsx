import { Suspense } from "react";
import { MbtiApp } from "./MbtiApp";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <MbtiApp />
    </Suspense>
  );
}
