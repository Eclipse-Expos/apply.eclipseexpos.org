import InputSection from "@/components/InputSection";
import StarBackground from "@/components/StarBackground";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <StarBackground />

      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <Image
          src="/images/logo-white.png"
          width={700}
          height={700}
          alt={"Eclipse Expos"}
          priority={true}
          quality={100}
        />

        <InputSection />
      </main>
    </>
  );
}
