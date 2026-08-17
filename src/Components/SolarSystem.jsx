import Earth from "./Earth"
import Sun from "./Sun"
import EarthOrbit from "./EarthOrbit"
import OrbitRing from "./OrbitRing"
import MilkyWay from "./MilkyWay"
import Galaxy from "./Galaxy"

function SolarSystem(){
    return(
        <group>
            <Sun/>
            <Galaxy/>
            {/* <OrbitRing radius={4}/> */}
             <EarthOrbit/>
        </group>
    )
}


export default  SolarSystem