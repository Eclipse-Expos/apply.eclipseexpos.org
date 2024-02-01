import MainWrapper from "@/components/MainWrapper";
import StarBackground from "@/components/StarBackground";
import Image from "next/image";
import InputSection from "@/components/InputSection";
import EclipseLogoSVG from "@/components/svgs/EclipseLogo";

export default function Home() {
  return (
    <>
      <StarBackground />

      <MainWrapper>
        <EclipseLogoSVG />
        <InputSection />
      </MainWrapper>
    </>
  );
}
