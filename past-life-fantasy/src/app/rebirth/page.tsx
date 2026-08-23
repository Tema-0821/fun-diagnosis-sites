import { Suspense } from "react";
import { ArchetypeQuizApp } from "@/components/ArchetypeQuizApp";

export default function RebirthPage() {
  return (
    <Suspense fallback={null}>
      <ArchetypeQuizApp kind="rebirth" />
    </Suspense>
  );
}
