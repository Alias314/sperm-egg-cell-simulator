import { Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

export const getRandomPosition = (range) => {
  const position = new Vector3(
    Math.random() * range - range / 2,
    Math.random() * range - range / 2,
    Math.random() * range - range / 2
  );
  
  return position;
};

export const getRandomRotation = (range) => {
  const rotation = new Vector3(
    degToRad(Math.random() * range),
    degToRad(Math.random() * range),
    degToRad(Math.random() * range)
  );

  return rotation;
};