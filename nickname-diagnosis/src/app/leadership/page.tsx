import { Suspense } from "react";
import { LeadershipApp } from "./LeadershipApp";

export default function LeadershipPage() {
  return (
    <Suspense fallback={null}>
      <LeadershipApp />
    </Suspense>
  );
}
