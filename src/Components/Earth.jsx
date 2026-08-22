import { useEffect, useRef } from "react";
import MoonOrbit from "./MoonOrbit"
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'

function Earth() {
  const { scene } = useGLTF("/models/earth.glb.glb")

  const earthMesh = useRef();
  const atmosphereMesh = useRef();
  const cloudsMesh = useRef();
  const cloudsMaterial = useRef(); // holds the shader material so useFrame can update it every frame

  useEffect(() => {
    const clouds = scene.getObjectByName("Object_3"); // confirmed: transparent, opacity 0.42 → this is the cloud layer

    if (!clouds || !clouds.isMesh) return;

    const cloudsTexture = clouds.material.map;
    if (!cloudsTexture) {
      console.warn(`"${clouds.name}" has no texture map — check mesh name`);
      return;
    }

    // let the drifting UV loop seamlessly instead of freezing at the texture edge
    cloudsTexture.wrapS = THREE.RepeatWrapping;
    cloudsTexture.wrapT = THREE.RepeatWrapping;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: cloudsTexture },
        uTime: { value: 0 },
        uOpacity: { value: 0.42 } // carried over from the original material's opacity
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uOpacity;
        varying vec2 vUv;

        void main() {
          vec2 driftedUv = vUv + vec2(uTime * 0.05, 0.0);
          vec4 color = texture2D(uTexture, driftedUv);
          color.a *= uOpacity;
          gl_FragColor = color;
        }
      `,
      transparent: true,
      depthWrite: false,      // avoids z-fighting/hiding issues against the earth surface underneath
      side: THREE.DoubleSide, // keep clouds visible from both inside and outside the shell
    });

    clouds.material = material;
    cloudsMaterial.current = material;

    return () => {
      material.dispose(); // cleanup on unmount / effect re-run
    };
  }, [scene]);

  useFrame((state) => {
    if (cloudsMaterial.current) {
      cloudsMaterial.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group position={[5, 0, 0]} castShadow receiveShadow>
      <primitive object={scene} scale={0.3} />
      <MoonOrbit />
    </group>
  );
}

export default Earth