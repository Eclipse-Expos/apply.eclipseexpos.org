import stars from "@/styles/stars.module.scss";

export default function StarBackground(): JSX.Element {
  return (
    <>
      <div className={stars.background}></div>
      <div className={stars.foreground}></div>
    </>
  );
}
