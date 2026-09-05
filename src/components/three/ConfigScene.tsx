import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

const MODELS = {
  chair: "/models/lounge_chair/mid_century_lounge_chair_1k.gltf",
  bed: "/models/gothic_bed/GothicBed_01_1k.gltf",
  table: "/models/round_wooden_table_01/round_wooden_table_01_1k.gltf",
  diningChair: "/models/dining_chair_02/dining_chair_02_1k.gltf",
  desk: "/models/metal_office_desk/metal_office_desk_1k.gltf",
} as const;

Object.values(MODELS).forEach((url) => useGLTF.preload(url));

const BRASS = "#c9a15b";

/**
 * Loads a Poly Haven model, tints its wood toward the selected finish and
 * normalises it so every piece is centred on the floor at a known height.
 */
function Piece({
  url,
  tint,
  fitHeight,
  position = [0, 0, 0],
  rotationY = 0,
  tintStrength = 0.72,
  stretchX = 1,
}: {
  url: string;
  tint: string;
  fitHeight: number;
  position?: [number, number, number];
  rotationY?: number;
  tintStrength?: number;
  /** Extra lengthwise scale along the model's local X (e.g. to lengthen a bed). */
  stretchX?: number;
}) {
  const { scene } = useGLTF(url);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const target = new THREE.Color(tint);
    clone.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat && !Array.isArray(mat)) {
        const next = mat.clone();
        if (next.color) {
          next.color.copy(new THREE.Color("#ffffff")).lerp(target, tintStrength);
        }
        next.envMapIntensity = 0.9;
        mesh.material = next;
      }
    });
    return clone;
  }, [scene, tint, tintStrength]);

  // Normalise: centre on the origin, sit on the floor, scale to a target height.
  const { scale, offset } = useMemo(() => {
    // World matrices on a freshly cloned tree are stale until this runs; without
    // it Box3 can measure a half-built model and the piece ends up floating.
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const s = fitHeight / Math.max(size.y, 0.001);
    return {
      scale: s,
      offset: new THREE.Vector3(-center.x * s * stretchX, -box.min.y * s, -center.z * s),
    };
  }, [model, fitHeight, stretchX]);

  return (
    <group position={position} rotation-y={rotationY}>
      <primitive
        object={model}
        scale={[scale * stretchX, scale, scale]}
        position={offset.toArray()}
      />
    </group>
  );
}

function BrassAccent({
  position,
  radius = 0.2,
}: {
  position: [number, number, number];
  radius?: number;
}) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, 0.02, 48]} />
        <meshStandardMaterial color={BRASS} metalness={1} roughness={0.22} />
      </mesh>
    </group>
  );
}

export type ScenePiece = "living" | "bedroom" | "dining" | "office" | "bespoke";

const CAMERA: Record<ScenePiece, [number, number, number]> = {
  living: [2.3, 1.4, 2.9],
  bedroom: [3.0, 1.5, 3.3],
  dining: [2.9, 1.7, 3.1],
  office: [2.7, 1.5, 3.0],
  bespoke: [2.5, 1.5, 3.0],
};

function Composition({ piece, tint }: { piece: ScenePiece; tint: string }) {
  if (piece === "bedroom") {
    return (
      <group>
        <Piece
          url={MODELS.bed}
          tint={tint}
          fitHeight={1.25}
          rotationY={-0.55}
          position={[0, 0, 0]}
        />
        <BrassAccent position={[1.15, 0.44, 0.62]} radius={0.16} />
        <mesh position={[1.15, 0.22, 0.62]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.44, 20]} />
          <meshStandardMaterial color={BRASS} metalness={1} roughness={0.28} />
        </mesh>
        <BrassAccent position={[1.15, 0.01, 0.62]} radius={0.13} />
      </group>
    );
  }

  if (piece === "dining") {
    // Table surface lands near y = 0.74; chairs are a touch taller and pulled
    // right up to the pedestal so the set reads as one piece.
    const seat = 0.6;
    return (
      <group>
        <Piece url={MODELS.table} tint={tint} fitHeight={0.74} rotationY={0.15} />
        <Piece
          url={MODELS.diningChair}
          tint={tint}
          fitHeight={0.82}
          position={[0, 0, seat]}
          rotationY={Math.PI}
        />
        <Piece
          url={MODELS.diningChair}
          tint={tint}
          fitHeight={0.82}
          position={[0, 0, -seat]}
          rotationY={0}
        />
        <Piece
          url={MODELS.diningChair}
          tint={tint}
          fitHeight={0.82}
          position={[seat, 0, 0]}
          rotationY={-Math.PI / 2}
        />
        <Piece
          url={MODELS.diningChair}
          tint={tint}
          fitHeight={0.82}
          position={[-seat, 0, 0]}
          rotationY={Math.PI / 2}
        />
        <BrassAccent position={[0, 0.75, 0]} radius={0.14} />
      </group>
    );
  }

  if (piece === "office") {
    // Desk squared to the view; chair tucked in at the working side, facing it.
    return (
      <group rotation-y={-0.35}>
        <Piece url={MODELS.desk} tint={tint} fitHeight={0.74} stretchX={0.82} tintStrength={0.85} />
        <Piece
          url={MODELS.diningChair}
          tint={tint}
          fitHeight={0.82}
          position={[0, 0, 0.66]}
          rotationY={Math.PI}
        />
        <BrassAccent position={[-0.55, 0.74, -0.1]} radius={0.1} />
      </group>
    );
  }

  if (piece === "bespoke") {
    return (
      <group>
        <Piece url={MODELS.chair} tint={tint} fitHeight={1.0} rotationY={0.2} />
        <group position={[1.05, 0, 0.2]}>
          <BrassAccent position={[0, 0.54, 0]} radius={0.22} />
          <mesh position={[0, 0.27, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.54, 20]} />
            <meshStandardMaterial color={BRASS} metalness={1} roughness={0.3} />
          </mesh>
          <BrassAccent position={[0, 0.01, 0]} radius={0.17} />
        </group>
      </group>
    );
  }

  return <Piece url={MODELS.chair} tint={tint} fitHeight={1.0} />;
}

function Stage({ piece, tint, scale }: { piece: ScenePiece; tint: string; scale: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const g = group.current;
    if (!g) return;
    g.rotation.y += dt * 0.12;
    const s = g.scale.x + (scale - g.scale.x) * (1 - Math.exp(-6 * dt));
    g.scale.setScalar(s);
    g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.01;
  });

  return (
    <group ref={group} scale={scale}>
      <Composition piece={piece} tint={tint} />
    </group>
  );
}

export default function ConfigScene({
  piece,
  tint,
  scale,
}: {
  piece: ScenePiece;
  tint: string;
  scale: number;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: CAMERA[piece], fov: 38 }}
      gl={{ antialias: true, toneMappingExposure: 1.05 }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3.5, 5, 2.5]}
        intensity={2}
        color="#ffe7c2"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-4, 2.5, -3]} intensity={0.55} color="#7fb6b0" />

      <Suspense fallback={null}>
        <group position={[0, -0.55, 0]}>
          <Stage piece={piece} tint={tint} scale={scale} />
          <ContactShadows
            position={[0, 0.001, 0]}
            opacity={0.55}
            scale={9}
            blur={2.6}
            far={4}
            resolution={512}
            color="#07110f"
          />
        </group>
        <Environment resolution={256}>
          <Lightformer intensity={2.2} position={[0, 4, 2]} scale={[8, 6, 1]} color="#fff2dd" />
          <Lightformer
            intensity={1.1}
            color="#8fb9b3"
            position={[-5, 1.5, -1]}
            rotation-y={Math.PI / 2}
            scale={[16, 3, 1]}
          />
          <Lightformer
            intensity={0.9}
            color="#c9a15b"
            position={[5, 2, 1]}
            rotation-y={-Math.PI / 2}
            scale={[12, 2, 1]}
          />
        </Environment>
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 2.05}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}
