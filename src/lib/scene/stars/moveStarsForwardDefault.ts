import { Group } from "three";
import { starAcceleration } from "../constants";

/**
 * Move the stars forward.
 * @param {Group} starGroup
 */
export function moveStarsForward(starGroup: Group): void {
  for (let i = 0; i < starGroup.children.length; i++) {
    const star = starGroup.children[i];

    // @ts-ignore
    star.position.y -= star.velocity;

    if (star.position.y < -200) star.position.y = 200;
  }
}
