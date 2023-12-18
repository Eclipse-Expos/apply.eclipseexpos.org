import InputSection from "@/components/InputSection";
import MainWrapper from "@/components/Main";
import StarBackground from "@/components/StarBackground";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <StarBackground />

      <MainWrapper>
        <Image
          src="/images/logo-white.png"
          width={700}
          height={700}
          alt={"Eclipse Expos"}
          priority={true}
          quality={100}
        />

        <InputSection />
      </MainWrapper>
    </>
  );
}
