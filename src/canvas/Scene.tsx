import { Canvas } from '@react-three/fiber';
import Sperm from './Sperm';
import { OrbitControls } from '@react-three/drei'
import { generateSperm } from '../utils/canvas';
import { useRef } from 'react';
import Egg from './Egg';
import Terrain from './Terrain';

export const Scene = () => {
  const entityAttributesRef = useRef(generateSperm(500, 1));
  const terrainRef = useRef();

  return (
    <Canvas camera={{ position: [3, 5, 3] }}>
      <ambientLight />
      <directionalLight position={[10, 10, -10]} />
      <gridHelper args={[100, 100, "#ebebeb", "#ebebeb"]} />
      <Terrain terrainRef={terrainRef} />

      {entityAttributesRef.current.sperm.map((sperm) => (
        <Sperm 
          key={sperm.id}
          id={sperm.id}
          position={sperm.position}
          entityAttributes={entityAttributesRef.current}
        />
      ))}

      {entityAttributesRef.current.egg.map((egg) => (
        <Egg 
          key={egg.id}
          id={egg.id}
          position={egg.position}
          entityAttributes={entityAttributesRef.current}
          terrainRef={terrainRef}
        />
      ))}
      <OrbitControls />
    </Canvas>
  );
};