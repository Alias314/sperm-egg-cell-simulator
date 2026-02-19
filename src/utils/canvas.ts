import { entityAttributes } from "../constants/entities";
import { getRandomPosition, getRandomRotation } from "./math";

export const generateSperm = (amountSperm, amountEgg) => {
  const entities = { sperm: [], egg: [] };

  for (let i = 0; i < amountSperm; i++) {
    entities.sperm.push({
      id: i,
      direction: getRandomRotation(entityAttributes.sperm.rotationRange).normalize(),
      position: getRandomPosition(entityAttributes.sperm.positionRange)
    });
  }

  for (let i = 0; i < amountEgg; i++) {
    entities.egg.push({
      id: i,
      direction: getRandomRotation(entityAttributes.egg.rotationRange).normalize(),
      position: getRandomPosition(entityAttributes.egg.positionRange)
    })
  }

  return entities;
};