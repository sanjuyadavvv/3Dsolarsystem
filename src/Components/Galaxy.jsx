// Galaxy.jsx
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";

function Galaxy() {
  const pointsRef = useRef();

  const {
    count,
    size,
    radius,
    branches,
    spin,
    randomness,
    verticalPower,
    horizontalPower,
    innerColor,
    outerColor,
    rotationSpeed,
  } = useControls("Galaxy", {
    count: { value: 200000, min: 100, max: 500000, step: 100 },
    size: { value: 20, min: 1, max: 50, step: 1 },
    radius: { value: 4, min: 0.5, max: 20, step: 0.1 },
    branches: { value: 5, min: 2, max: 12, step: 1 },
    spin: { value: 2, min: -5, max: 5, step: 0.1 },
    randomness: { value: 0.4, min: 0, max: 2, step: 0.01 },
    verticalPower: { value: 4, min: 1, max: 10, step: 0.5 },
    horizontalPower: { value: 2, min: 1, max: 10, step: 0.5 },
    innerColor: "#3d665f",
    outerColor: "#bbbbf7",
    rotationSpeed: { value: 0.1, min: 0, max: 2, step: 0.01 },
  });

  // Positions + radii — only recompute when the SHAPE changes.
  // radii is stored alongside positions so the color effect can
  // reuse the exact same r per particle without redoing this loop.
  const { positions, radii } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const radii = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * radius;
      radii[i] = r; // <-- stash it for the color pass

      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const randomX =
        Math.pow(Math.random(), horizontalPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;
      const randomY =
        Math.pow(Math.random(), verticalPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r *
        0.3;
      const randomZ =
        Math.pow(Math.random(), horizontalPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;
    }

    return { positions, radii };
  }, [count, radius, branches, spin, randomness, verticalPower, horizontalPower]);

  // Colors — only recompute when the PALETTE changes.
  // Reuses radii[] instead of regenerating random radius values,
  // so this stays a cheap loop even at 200k particles.
 const colors = useMemo(() => {
  const colors = new Float32Array(count * 3);

  const colorInside = new THREE.Color(innerColor);
  const colorOutside = new THREE.Color(outerColor);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const r = radii[i];

    const mixedColor = colorInside.clone();

    mixedColor.lerp(
      colorOutside,
      r / radius
    );

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  return colors;
}, [count, radius, radii, innerColor, outerColor]);
  // Slow rotation
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
        //   count={count}
        //   array={positions}
        //   itemSize={3}

          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
        //   count={count}
        //   array={colors}
        //   itemSize={3}

          args={[colors, 3]}
    normalized={false}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size / 1000}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={true}
      />
    </points>
  );
}

export default Galaxy;