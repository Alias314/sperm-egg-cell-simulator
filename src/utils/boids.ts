import { Vector3 } from "three";

export const getAlignmentDirection = (radius, sourceEntityId, entityAttributes) => {
  const direction = new Vector3();
  let amountNearbySperm = 0;

  for (const targetEntityId in entityAttributes) {
    if (sourceEntityId === targetEntityId) continue;
    const sourceEntity = entityAttributes[sourceEntityId];
    const targetEntity = entityAttributes[targetEntityId];
    const distance = sourceEntity.position.distanceTo(targetEntity.position);
    
    if (distance <= radius) {
      direction.add(entityAttributes[targetEntityId].direction);
      amountNearbySperm++;
    }
  }

  if (amountNearbySperm > 0) direction.divideScalar(amountNearbySperm);
  return direction;
}

export const getCohesionDirection = (radius, sourceEntityId, entityAttributes) => {
  const direction = new Vector3();
  let amountNearbySperm = 0;

  for (const targetEntityId in entityAttributes) {
    if (sourceEntityId === targetEntityId) continue;
    const sourceEntity = entityAttributes[sourceEntityId];
    const targetEntity = entityAttributes[targetEntityId];
    const distance = sourceEntity.position.distanceTo(targetEntity.position);
    
    if (distance <= radius) {
      direction.add(entityAttributes[targetEntityId].position);
      amountNearbySperm++;
    }
  }

  if (amountNearbySperm > 0) direction.divideScalar(amountNearbySperm);
  return direction;
}

export const getSpermEggCohesionDirection = (radius, sourceEntityId, spermEntityAttributes, eggEntityAttributes) => {
  const direction = new Vector3();
  let amountNearbySperm = 0;

  for (const targetEntityId in eggEntityAttributes) {
    const sourceEntity = spermEntityAttributes[sourceEntityId];
    const targetEntity = eggEntityAttributes[targetEntityId];
    const distance = sourceEntity.position.distanceTo(targetEntity.position);
    
    if (distance <= radius) {
      direction.add(eggEntityAttributes[targetEntityId].position);
      amountNearbySperm++;
    }
  }

  if (amountNearbySperm > 0) direction.divideScalar(amountNearbySperm);
  return direction;
}

export const getSeparationDirection = (radius, sourceEntityId, entityAttributes) => {
  const direction = new Vector3();
  const diff = new Vector3();
  let amountNearbySperm = 0;

  for (const targetEntityId in entityAttributes) {
    if (sourceEntityId === targetEntityId) continue;
    const sourceEntity = entityAttributes[sourceEntityId];
    const targetEntity = entityAttributes[targetEntityId];
    let distance = sourceEntity.position.distanceTo(targetEntity.position);
    
    if (distance <= radius) {
      diff.subVectors(sourceEntity.position, entityAttributes[targetEntityId].position);
      diff.normalize();
      distance = Math.max(distance, 0.01);
      diff.divideScalar(distance);
      direction.add(diff);
      amountNearbySperm++;
    }
  }

  if (amountNearbySperm > 0) direction.divideScalar(amountNearbySperm);
  return direction;
}

export const getSpermEggSeparationDirection = (radius, sourceEntityId, spermEntityAttributes, eggEntityAttributes) => {
  const direction = new Vector3();
  const diff = new Vector3();
  let amountNearbySperm = 0;
  
  for (const targetEntityId in eggEntityAttributes) {
    if (sourceEntityId === targetEntityId) continue;
    const sourceEntity = spermEntityAttributes[sourceEntityId];
    const targetEntity = eggEntityAttributes[targetEntityId];
    let distance = sourceEntity.position.distanceTo(targetEntity.position);
    
    if (distance <= radius) {
      diff.subVectors(sourceEntity.position, eggEntityAttributes[targetEntityId].position);
      diff.normalize();
      distance = Math.max(distance, 0.01);
      direction.add(diff);
      amountNearbySperm++;
    }
  }

  if (amountNearbySperm > 0) direction.divideScalar(amountNearbySperm);
  return direction;
}