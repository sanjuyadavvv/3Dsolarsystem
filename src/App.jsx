import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Sun from "./Components/Sun";
import Earth from "./Components/Earth";
import EarthOrbit from "./Components/EarthOrbit";
import SolarSystem from "./Components/SolarSystem";
function App(){
return(
  <Canvas camera={{position:[0,5,10],fov:50}} shadows>
    <OrbitControls/>
    <ambientLight intensity={1}/>
      {/* <MilkyWay/> */}
   <SolarSystem/>
  </Canvas>
)
}


export default App;
