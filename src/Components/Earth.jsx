import { useEffect } from "react";
import MoonOrbit from "./MoonOrbit"
import OrbitRing from "./OrbitRing";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
function Earth() {

const {scene} = useGLTF("/models/earth.glb.glb")

const earthMesh = useRef();
const atmosphereMesh = useRef();
const cloudsMesh = useRef();

useEffect(() => {
  scene.traverse((object) => {
    if (object.isMesh) {
      console.log("------------");
      console.log("NAME:", object.name);
      console.log("MATERIAL:", object.material.name);
      console.log("MAP:", object.material.map);
      console.log("NORMAL MAP:", object.material.normalMap);
      console.log("ROUGHNESS MAP:", object.material.roughnessMap);
      console.log("ALPHA MAP:", object.material.alphaMap);
    }
  });
}, [scene]);


useEffect(()=>{
    const clouds=scene.getObjectByName('Object_4')

    if(clouds){
    //   clouds.material.map=null;
      clouds.material.needsUpdate=true;
    //  clouds.material.color.set("red")
    }
})









  return (
    <group position={[4, 0, 0]} castShadow receiveShadow>
      <primitive object={scene} scale={0.4}/>
      <MoonOrbit />
    </group>
  );
}


export default Earth