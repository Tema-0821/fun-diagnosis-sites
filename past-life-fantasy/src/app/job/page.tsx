import { Suspense } from "react";
import { JobApp } from "./JobApp";

export default function JobPage() {
  return (
    <Suspense fallback={null}>
      <JobApp />
    </Suspense>
  );
}
