import { initStarScene } from "@/lib/scene/scene";
import { useEffect } from "react";

export default function SceneCanvas() {
  let scene: HTMLCanvasElement | null = null;

  useEffect(() => {
    initStarScene(scene as HTMLCanvasElement);
  }, [scene]);

  return (
    <canvas
      ref={(canvas) => (scene = canvas)}
      className="absolute inset-0 -z-50 bg-black"
    />
  );
}
