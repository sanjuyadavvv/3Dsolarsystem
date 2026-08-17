// import { useTexture } from "@react-three/drei";
// import * as THREE from 'three'


// function MilkyWay(){
//     const texture=useTexture("/models/Milkyway.jpg")


//   texture.mapping = THREE.EquirectangularReflectionMapping;

//     return (
//        <primitive
//       attach="background"
//       object={texture}
//     />
//     )
// }


// export default MilkyWay


import { useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import { useEffect } from "react"
import * as THREE from "three"

function MilkyWay() {
  const bgTexture = useTexture("/models/Milkyway.jpg")
//   const starsTexture = useTexture("/models/stars_sparse.png") // small bright points, transparent bg

  return (
    <group>
      {/* distant, essentially static */}
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[800, 64, 64]} />
        <meshBasicMaterial map={bgTexture} side={THREE.BackSide} />
      </mesh>

      {/* closer star layer — moves relative to camera as you fly */}
      {/* <points>
        <sphereGeometry args={[200, 32, 32]} />
        <pointsMaterial size={1.5}  transparent sizeAttenuation />
      </points> */}
    </group>
  )
}


export default MilkyWay