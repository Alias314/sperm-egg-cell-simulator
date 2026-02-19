import { useRef } from "react"
import { DoubleSide } from "three"

const Terrain = ({ terrainRef }) => {  
  return (
    <mesh ref={terrainRef} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial side={DoubleSide} transparent opacity={0} />
    </mesh>
  )
}

export default Terrain