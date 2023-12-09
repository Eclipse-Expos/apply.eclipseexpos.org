import { PerspectiveCamera } from "three";

/**
 * Initialize the camera.
 * @returns {PerspectiveCamera}
 */
export function initCamera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.z = 1.5;
  camera.rotation.x = Math.PI / 2;

  return camera;
}
