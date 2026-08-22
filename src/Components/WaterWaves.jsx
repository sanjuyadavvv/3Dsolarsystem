import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"


function Waves(){
    const materialRef=useRef()

    return (
        <mesh rotation={[-Math.PI/2,0,0]}>
            <planeGeometry args={[10,10,120,120]}/>
            <shaderMaterial ref={materialRef}
            uniforms={{
                uTime:{value:0},

            }}
            vertexShader={`
          uniform float uTime;
          varying float vElevation;

          void main() {
            vec3 newPosition = position;

            float elevation = sin(position.x * 2.0 + uTime) * 0.15;
            elevation += sin(position.y * 3.0 + uTime * 1.5) * 0.1;

            newPosition.z += elevation;
            vElevation = elevation;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `}

         fragmentShader={`
          varying float vElevation;

          void main() {
            vec3 deepColor = vec3(0.0, 0.2, 0.5);
            vec3 shallowColor = vec3(0.3, 0.7, 1.0);

            // remap elevation (-0.25 to 0.25 roughly) into a 0-1 blend factor
            float mixStrength = (vElevation + 0.25) * 2.0;
            vec3 color = mix(deepColor, shallowColor, mixStrength);

            gl_FragColor = vec4(color, 1.0);
          }
        `}

        side={THREE.DoubleSide}
        />

        </mesh>
    )
}


export default Waves;