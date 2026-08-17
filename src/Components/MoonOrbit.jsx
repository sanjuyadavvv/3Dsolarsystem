import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import Moon from "./Moon";
function MoonOrbit(){
    const moonOrbitref=useRef();
    useFrame((state,delta)=>{
        moonOrbitref.current.rotation.y+=delta*2;

    })
    return (
        <group ref={moonOrbitref}>
            <Moon/>

        </group>
    )
}


export default MoonOrbit