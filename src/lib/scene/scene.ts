import { initScene } from "./initScene";
import { initBloomComposer } from "./initBloomComposer";
import { initCamera } from "./initCamera";
import { initRenderer } from "./initRenderer";
import { initStarGroup } from "./stars/initStarGroup";
import { moveStarsForward } from "./stars/moveStarsForwardDefault";
import { PerspectiveCamera, WebGLRenderer } from "three";

interface Screen {
  width: number;
  height: number;
  pixelRatio: number;
}

/**
 * Resize the renderer and camera.
 * @param {WebGLRenderer} renderer
 * @param {PerspectiveCamera} camera
 * @param {Screen} screen
 */
function resize(
  renderer: WebGLRenderer,
  camera: PerspectiveCamera,
  screen: Screen,
) {
  renderer.setSize(screen.width, screen.height);
  renderer.setPixelRatio(screen.pixelRatio);
  camera.aspect = screen.width / screen.height;
  camera.updateProjectionMatrix();

  return { renderer, camera };
}

/**
 * Initialize the star scene.
 * @param {HTMLCanvasElement} canvas
 */
export function initStarScene(canvas: HTMLCanvasElement) {
  if (typeof window === "undefined") return;

  const scene = initScene();
  const camera = initCamera();
  const renderer = initRenderer(canvas);
  const bloomComposer = initBloomComposer(renderer, scene, camera);
  const initialScreen = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
  };

  const starGroup = initStarGroup();
  scene.add(starGroup);

  window.addEventListener("resize", () => {
    const screen: Screen = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio,
    };

    resize(renderer, camera, {
      width:
        initialScreen.width > screen.width ? initialScreen.width : screen.width,
      height: screen.height,
      pixelRatio: screen.pixelRatio,
    });
  });

  renderer.setAnimationLoop(() => {
    moveStarsForward(starGroup);
    bloomComposer.render();
    renderer.render(scene, camera);
  });
}
