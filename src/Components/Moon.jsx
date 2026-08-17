function Moon() {
  return (
    <mesh position={[1, 0, 0]} castShadow receiveShadow>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial color="gray"  />
    </mesh>
  );
}

export default Moon