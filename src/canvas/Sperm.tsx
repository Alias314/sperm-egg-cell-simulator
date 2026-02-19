import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import tailVertexShader from '../shaders/sperm/tail/tailVertexShader.glsl';
import tailFragmentShader from '../shaders/sperm/tail/tailFragmentShader.glsl';
import headVertexShader from '../shaders/sperm/head/headVertexShader.glsl';
import headFragmentShader from '../shaders/sperm/head/headFragmentShader.glsl';
import { getAlignmentDirection, getCohesionDirection, getSeparationDirection, getSpermEggCohesionDirection, getSpermEggSeparationDirection } from "../utils/boids";
import { Vector3 } from "three";

const Sperm = ({ id, position, entityAttributes }) => {
  const newDirection = new Vector3();
  const lookAtDirection = new Vector3();
  const groupRef = useRef();
  const headMeshRef = useRef();
  const tailShaderRef = useRef();
  const headShaderRef = useRef();
  const groupScale = 0.2;
  const delayOffset = Math.random() * 100;
  const speed = 2;
  
  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime() + delayOffset;
    tailShaderRef.current.uniforms.uTime.value = elapsedTime;
    headShaderRef.current.uniforms.uTime.value = elapsedTime;
    
    const groupPos = groupRef.current.position;
    const alignmentDirection = getAlignmentDirection(1, id, entityAttributes.sperm);
    const separationDirection = getSeparationDirection(0.5, id, entityAttributes.sperm);
    const spermEggCohesionDirection = getSpermEggCohesionDirection(100, id, entityAttributes.sperm, entityAttributes.egg);
    const spermEggSeparationDirection = getSpermEggSeparationDirection(2, id, entityAttributes.sperm, entityAttributes.egg);

    alignmentDirection.sub(entityAttributes.sperm[id].direction).multiplyScalar(5);
    spermEggCohesionDirection.sub(entityAttributes.sperm[id].position);

    newDirection.copy(entityAttributes.sperm[id].direction);
    newDirection.sub(alignmentDirection);
    newDirection.add(spermEggCohesionDirection).multiplyScalar(1.5);
    newDirection.add(spermEggSeparationDirection);
    newDirection.add(separationDirection).normalize();
    
    groupPos.addScaledVector(newDirection, speed * delta);
    lookAtDirection.addVectors(groupPos, newDirection);
    groupRef.current.lookAt(lookAtDirection);

    entityAttributes.sperm[id].direction.copy(newDirection);
    entityAttributes.sperm[id].position.copy(groupPos);
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={[groupScale, groupScale, groupScale]} 
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <coneGeometry args={[0.05, 1, 32, 32]} />
          <shaderMaterial
            ref={tailShaderRef}
            vertexShader={tailVertexShader}
            fragmentShader={tailFragmentShader}
            uniforms={{
              uTime: { value: 0 },
            }}
          />
        </mesh>

        <mesh ref={headMeshRef} position={[0, -0.65, 0]}>
          <capsuleGeometry args={[0.1, 0.2]} />
          <shaderMaterial
            ref={headShaderRef}
            vertexShader={headVertexShader}
            fragmentShader={headFragmentShader}
            uniforms={{
              uTime: { value: 0 }
            }}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Sperm;
