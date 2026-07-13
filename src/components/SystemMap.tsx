import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Text } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Group } from "three";

type Point = [number, number, number];

const nodes: { label: string; position: Point; color: string; scale?: number }[] = [
  { label: "AUTHORITATIVE\nSERVER", position: [0, 0, 0], color: "#f3f2ff", scale: 1.25 },
  { label: "CORE", position: [-2.35, .4, .25], color: "#8b7cff" },
  { label: "AGENT\nOPTIONAL", position: [2.45, 1.25, -.2], color: "#54c8ff" },
  { label: "GAME\nCLIENT", position: [2.5, -1.35, .4], color: "#697cff" },
  { label: "EVIDENCE", position: [-1.65, -1.85, -.15], color: "#b7adff" },
];

function Node({ label, position, color, scale = 1 }: (typeof nodes)[number]) {
  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.16}>
      <group position={position} scale={scale}>
        <mesh>
          <icosahedronGeometry args={[.36, 1]} />
          <meshStandardMaterial color="#111119" emissive={color} emissiveIntensity={.28} roughness={.28} metalness={.55} />
        </mesh>
        <mesh scale={1.16}>
          <icosahedronGeometry args={[.36, 1]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={.52} />
        </mesh>
        <Text position={[0, -.62, 0]} fontSize={.13} lineHeight={1.25} textAlign="center" color="#b7b5c5" anchorX="center" anchorY="top">
          {label}
        </Text>
      </group>
    </Float>
  );
}

function Scene() {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * .035;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * .18) * .025;
    }
  });
  return (
    <group ref={group}>
      {nodes.map((node) => <Node key={node.label} {...node} />)}
      <Line points={[nodes[3].position, nodes[1].position, nodes[0].position]} color="#7468ff" transparent opacity={.72} lineWidth={1.2} />
      <Line points={[nodes[2].position, nodes[3].position]} color="#54c8ff" transparent opacity={.55} dashed dashScale={10} dashSize={.14} gapSize={.1} lineWidth={1} />
      <Line points={[nodes[2].position, nodes[4].position, nodes[0].position]} color="#9d91ff" transparent opacity={.42} dashed dashScale={9} dashSize={.12} gapSize={.12} lineWidth={1} />
      <gridHelper args={[8, 16, "#292638", "#16151e"]} position={[0, -2.4, 0]} />
    </group>
  );
}

function StaticMap() {
  return (
    <div className="static-map" role="img" aria-label="Game clients send untrusted action intent through Certael Core to an authoritative server. The optional Agent sends advisory evidence on a separate path.">
      <svg viewBox="0 0 720 470" aria-hidden="true">
        <defs>
          <linearGradient id="flow" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8b7cff"/><stop offset="1" stopColor="#54c8ff"/></linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g className="map-lines"><path d="M570 340 245 250 370 170"/><path className="dashed" d="M575 95 570 340"/><path className="dashed" d="M575 95 190 375 370 170"/></g>
        <g className="map-node" transform="translate(370 170)"><circle r="43"/><circle r="31" className="fill"/><text y="68">AUTHORITATIVE SERVER</text></g>
        <g className="map-node" transform="translate(245 250)"><circle r="34"/><circle r="24" className="fill"/><text y="56">CORE</text></g>
        <g className="map-node cyan" transform="translate(575 95)"><circle r="34"/><circle r="24" className="fill"/><text y="56">AGENT · OPTIONAL</text></g>
        <g className="map-node" transform="translate(570 340)"><circle r="34"/><circle r="24" className="fill"/><text y="56">GAME CLIENT</text></g>
        <g className="map-node" transform="translate(190 375)"><circle r="28"/><circle r="19" className="fill"/><text y="48">EVIDENCE</text></g>
      </svg>
    </div>
  );
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export default function SystemMap() {
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setInteractive(!reduced && supportsWebGL());
  }, []);

  if (!interactive) return <StaticMap />;
  return (
    <div className="system-map" role="img" aria-label="Interactive Certael architecture. Core admits actions to the authoritative server. Agent provides an optional evidence path.">
      <div className="canvas-fallback" aria-hidden="true"><StaticMap /></div>
      <Canvas camera={{ position: [0, 1.15, 6.7], fov: 43 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={.6} />
        <pointLight color="#8173ff" intensity={15} position={[-2, 2, 4]} />
        <pointLight color="#54c8ff" intensity={9} position={[3, 1, 2]} />
        <Suspense fallback={null}><Scene /></Suspense>
        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={1.05} maxPolarAngle={2.0} autoRotate autoRotateSpeed={.18} />
      </Canvas>
    </div>
  );
}
