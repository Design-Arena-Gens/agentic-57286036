'use client';

import { memo, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Float,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from '@react-three/drei';
import * as THREE from 'three';

type TableProps = {
  position: [number, number, number];
  seats?: number;
  intensity?: number;
};

const Table = memo(({ position, seats = 4, intensity = 1 }: TableProps) => {
  const seatPositions = useMemo(() => {
    const positions: Array<[number, number, number]> = [];
    const radius = 1.25;
    for (let i = 0; i < seats; i++) {
      const angle = (i / seats) * Math.PI * 2;
      positions.push([
        Math.cos(angle) * radius,
        0.2,
        Math.sin(angle) * radius,
      ]);
    }
    return positions;
  }, [seats]);

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.24, 42]} />
        <meshStandardMaterial
          color={new THREE.Color('#343f86').multiplyScalar(intensity).getStyle()}
          metalness={0.85}
          roughness={0.28}
        />
      </mesh>
      <Float floatIntensity={1.2} speed={2}>
        <mesh position={[0, 1.15, 0]}>
          <torusGeometry args={[1.45, 0.04, 32, 64]} />
          <meshStandardMaterial
            color={new THREE.Color('#ffb86c').multiplyScalar(intensity).getStyle()}
            emissive="#ffb86c"
            emissiveIntensity={0.26}
            roughness={0.1}
            metalness={1}
          />
        </mesh>
      </Float>
      {seatPositions.map((seatPosition, index) => (
        <mesh key={index} position={seatPosition} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.32, 0.42]} />
          <meshStandardMaterial
            color={new THREE.Color('#19203f').multiplyScalar(intensity).getStyle()}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
});
Table.displayName = 'Table';

const BarCounter = memo(() => (
  <group position={[0, 0.6, -6]}>
    <mesh castShadow receiveShadow>
      <boxGeometry args={[10, 1.2, 1.8]} />
      <meshStandardMaterial
        color="#151d36"
        metalness={0.75}
        roughness={0.25}
      />
    </mesh>
    <mesh position={[0, 1.3, -0.55]}>
      <boxGeometry args={[10.2, 0.12, 0.4]} />
      <meshStandardMaterial color="#ffaa4c" emissive="#ffaa4c" emissiveIntensity={0.5} />
    </mesh>
  </group>
));
BarCounter.displayName = 'BarCounter';

const Floor = () => (
  <mesh rotation-x={-Math.PI / 2} receiveShadow>
    <planeGeometry args={[36, 36]} />
    <meshStandardMaterial
      color="#0e1224"
      metalness={0.1}
      roughness={0.65}
      side={THREE.DoubleSide}
    />
  </mesh>
);

const LightColumns = memo(() => {
  const columns = useMemo(() => {
    const data: Array<{ position: [number, number, number]; height: number }> = [];
    const radius = 13;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      data.push({
        position: [Math.cos(angle) * radius, 2, Math.sin(angle) * radius],
        height: 4.5,
      });
    }
    return data;
  }, []);

  return (
    <group>
      {columns.map(({ position, height }, idx) => (
        <group key={idx} position={position}>
          <mesh position={[0, height / 2, 0]}>
            <cylinderGeometry args={[0.28, 0.32, height, 24]} />
            <meshStandardMaterial color="#0c0f1a" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[0, height, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.52, 32]} />
            <meshStandardMaterial
              color="#6f8aff"
              emissive="#86afff"
              emissiveIntensity={0.9}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
});
LightColumns.displayName = 'LightColumns';

const tablesLayout: Array<TableProps> = [
  { position: [-6, 0.2, -2], seats: 4, intensity: 1 },
  { position: [6, 0.2, -1], seats: 4, intensity: 1 },
  { position: [-3.5, 0.2, 4], seats: 6, intensity: 1.1 },
  { position: [3.5, 0.2, 4], seats: 6, intensity: 1.1 },
  { position: [0, 0.2, 0], seats: 8, intensity: 1.2 },
  { position: [10, 0.2, 2], seats: 4, intensity: 0.9 },
  { position: [-10, 0.2, 1], seats: 4, intensity: 0.9 },
];

export function RestaurantScene() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#05070f]/60 shadow-[0_35px_120px_-45px_rgba(10,12,38,0.8)]">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#05060f']} />
        <PerspectiveCamera makeDefault position={[0, 9, 16]} fov={42} />
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[6, 12, 6]}
          intensity={1.15}
          color="#ffb377"
          castShadow
        />
        <spotLight
          position={[-4, 12, 6]}
          angle={0.7}
          penumbra={0.45}
          intensity={0.75}
          color="#7aa7ff"
          castShadow
        />
        <pointLight position={[0, 4, 0]} intensity={1.25} color="#ffaa4c" />

        <group position={[0, -0.1, 0]}>
          <Floor />
          <LightColumns />
          <BarCounter />
          {tablesLayout.map((table) => (
            <Table key={table.position.toString()} {...table} />
          ))}
        </group>

        <Float floatIntensity={0.3} speed={0.6}>
          <mesh position={[0, 7.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[10, 10.8, 64]} />
            <meshStandardMaterial
              color="#4a68ff"
              emissive="#4a68ff"
              emissiveIntensity={0.32}
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>

        <Stars radius={50} depth={20} count={2500} factor={4} saturation={0} />
        <Environment preset="city" />

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.3}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
          enableDamping
          dampingFactor={0.12}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}

export default RestaurantScene;
