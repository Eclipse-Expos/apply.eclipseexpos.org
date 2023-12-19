import MainWrapper from "@/components/Main";
import StarBackground from "@/components/StarBackground";
import Image from "next/image";
import Head from "next/head";
import InputSection from "@/components/InputSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Eclipse Expos</title>
        <meta name="description" content="Eclipse Expos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
