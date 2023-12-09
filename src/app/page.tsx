"use client";

import InfoInput from "@/components/InfoInput";
import SceneCanvas from "@/components/SceneCanvas";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <InfoInput />
      </main>

      <SceneCanvas />
    </>
  );
}
