import * as THREE from "three"

function OrbitRing({radius}){
return (
    <mesh rotation ={[Math.PI/2,0,0]}>
<ringGeometry args={[radius-0.01,radius,64]}/>
<meshBasicMaterial>

</meshBasicMaterial>
    </mesh>
)
}


export default OrbitRing