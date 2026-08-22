import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function SunGlow() {

  const sunTexture =
    useTexture("/models/2k_sun.jpg");

  return (
    <>
      {/* =========================
          ACTUAL SUN
      ========================= */}

      <mesh>

        <sphereGeometry
          args={[2, 128, 128]}
        />

        <meshStandardMaterial
          map={sunTexture}

          emissive={
            new THREE.Color("#ff8a00")
          }

          emissiveMap={sunTexture}

          emissiveIntensity={4}
          toneMapped={false}
          roughness={1}
          metalness={0}
        />

      </mesh>


      {/* =========================
          SHADER CORONA
      ========================= */}

      <mesh scale={1.0001}>

        <sphereGeometry
          args={[2, 64, 64]}
        />

        <shaderMaterial

          transparent

          depthWrite={false}

          blending={
            THREE.AdditiveBlending
          }

          side={THREE.BackSide}

          vertexShader={`
            varying vec3 vWorldPosition;
            varying vec3 vNormal;

            void main() {

              vNormal =
                normalize(
                  mat3(modelMatrix) * normal
                );

              vec4 worldPosition =
                modelMatrix *
                vec4(position, 1.0);

              vWorldPosition =
                worldPosition.xyz;

              gl_Position =
                projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
            }
          `}

          fragmentShader={`
            varying vec3 vWorldPosition;
            varying vec3 vNormal;

            void main() {

              // Direction from surface
              // toward camera

              vec3 viewDirection =
                normalize(
                  cameraPosition -
                  vWorldPosition
                );


              // Fresnel

              float fresnel =
                1.0 -
                dot(
                  vNormal,
                  viewDirection
                );


              fresnel =
                clamp(
                  fresnel,
                  0.0,
                  1.0
                );


              // Smooth transition

              fresnel =
                smoothstep(
                  0.0,
                  1.0,
                  fresnel
                );


              // Soft falloff

              fresnel =
                pow(
                  fresnel,
                  1.5
                );


              // Sun orange

              vec3 glowColor =
                vec3(
               1.0, 1.0, 1.0
                );


              // LOW opacity

              float alpha = fresnel * 0.08;


              // Glow brightness

              vec3 color =
                glowColor *
                fresnel *
                1.5;

            float limb = dot(vNormal, viewDirection);
limb = pow(clamp(limb, 0.0, 1.0), 0.4); // center bright, edge dark
vec3 finalColor = baseColor * mix(0.3, 1.0, limb);

              gl_FragColor =
                vec4(
                  color,
                  alpha
                );
            }
          `}
        />

      </mesh>


      {/* =========================
          LIGHT
      ========================= */}

      <pointLight
         color="#fff0cc"
        intensity={100}
        distance={50}
      />

    </>
  );
}

export default SunGlow;