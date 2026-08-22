import { Suspense } from "react";
import { MoodApp } from "./MoodApp";

export default function MoodPage() {
  return (
    <Suspense fallback={null}>
      <MoodApp />
    </Suspense>
  );
}
