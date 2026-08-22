import { Suspense } from "react";
import { NicknameApp } from "./NicknameApp";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <NicknameApp />
    </Suspense>
  );
}
