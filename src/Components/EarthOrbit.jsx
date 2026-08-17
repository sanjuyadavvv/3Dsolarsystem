import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Earth from "./Earth";


function EarthOrbit() {
  const orbitRef = useRef();
  useFrame((state, delta) => {
    orbitRef.current.rotation.y += delta * 0.5;
    
  });

  return (
    <group ref={orbitRef}>
       <Earth/>
    </group>
  );
}


export default EarthOrbit