import { SphereGeometry } from "three";
import { useTexture } from "@react-three/drei";
function Sun(){

    const sunTexture= useTexture('/models/2k_sun.jpg')
    return (
        <>
        <mesh position={[0,0,0]}>
            <sphereGeometry  args={[1,32,32]}  />
 <meshStandardMaterial map={sunTexture}/>    
        </mesh>
        <pointLight intensity={50} distance={50} castShadow>

        </pointLight>
        </>
    )
}


export default Sun