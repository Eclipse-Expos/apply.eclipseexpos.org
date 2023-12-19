import MainWrapper from "@/components/MainWrapper";
import StarBackground from "@/components/StarBackground";
import Image from "next/image";
import InputSection from "@/components/InputSection";
import PageHead from "@/components/PageHead";

export default function Home() {
  return (
    <>
      <PageHead title="Eclipse Expos" description="Eclipse Expos" />

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
