import eggInnerLayerVertexShader from '../shaders/egg/innerLayer/eggInnerLayerVertexShader.glsl';
import eggInnerLayerFragmentShader from '../shaders/egg/innerLayer/eggInnerLayerFragmentShader.glsl';
import eggOuterLayerVertexShader from '../shaders/egg/outerLayer/eggOuterLayerVertexShader.glsl';
import eggOuterLayerFragmentShader from '../shaders/egg/outerLayer/eggOuterLayerFragmentShader.glsl';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Raycaster, Vector3 } from 'three';

const Egg = ({ id, position, entityAttributes, terrainRef }) => {
  const { pointer, camera } = useThree();
  const raycaster = new Raycaster();
  const lerpedPos = new Vector3();
  const meshRef = useRef();
  let intersects = [];

  useFrame(() => {
    if (!terrainRef.current) return; 
    const entityPos = meshRef.current.position;

    raycaster.setFromCamera(pointer, camera);
    intersects = raycaster.intersectObject(terrainRef.current, true);
    const intersectPos = intersects[0].point;
    lerpedPos.lerpVectors(entityPos, intersectPos, 0.2);

    entityPos.copy(lerpedPos);

    entityAttributes.egg[id].position.copy(entityPos);
  });

  return (
    <group
      ref={meshRef}
      position={position}
    >
      <mesh 
        key={eggInnerLayerVertexShader + eggInnerLayerFragmentShader} 
      >
        <octahedronGeometry args={[1, 20]} />
        <shaderMaterial 
          vertexShader={eggInnerLayerVertexShader}
          fragmentShader={eggInnerLayerFragmentShader}
        />
      </mesh>

      <mesh 
        key={eggOuterLayerVertexShader + eggOuterLayerFragmentShader} 
        ref={meshRef}
        position={position}
      >
        <octahedronGeometry args={[1.2, 20]} />
        <shaderMaterial 
          vertexShader={eggOuterLayerVertexShader}
          fragmentShader={eggOuterLayerFragmentShader}
          transparent
        />
      </mesh>
    </group>
  );
};

export default Egg;