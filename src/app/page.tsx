"use client";

import InfoInput from "@/components/InfoInput";
import stars from "@/styles/stars.module.scss";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className={stars.background}></div>
      <div className={stars.foreground}></div>

      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Image
          src="/images/logo-white.png"
          width={700}
          height={700}
          alt={"..."}
        />
        <InfoInput />
      </main>
    </>
  );
}
