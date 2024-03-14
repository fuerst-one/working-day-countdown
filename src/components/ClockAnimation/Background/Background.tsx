import * as THREE from "three";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Icosahedron,
  useTexture,
  useCubeTexture,
  MeshDistortMaterial,
} from "@react-three/drei";
import { AlarmClock } from "../AlarmClock/AlarmClock";

type IcosahedronRef = THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[],
  THREE.Object3DEventMap
>;

function MainSphere({ material }: { material: THREE.Material }) {
  const main = useRef<IcosahedronRef>(null);

  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    const object = main.current!;
    if (!object) return;
    object.rotation.z = clock.getElapsedTime();
    object.rotation.y = THREE.MathUtils.lerp(
      object.rotation.y,
      mouse.x * Math.PI,
      0.1,
    );
    object.rotation.x = THREE.MathUtils.lerp(
      object.rotation.x,
      mouse.y * Math.PI,
      0.1,
    );
  });
  return (
    <Icosahedron
      args={[1, 4]}
      ref={main}
      material={material}
      position={[0, 0, 0]}
    />
  );
}

const Instances = () => {
  // we use this array ref to store the objects after creating them
  const [objectRefs] = useState<THREE.Group[]>([]);

  // we use this array to initialize the background objects
  const initialPositions = [
    [-4, 20, -12],
    [-10, 12, -4],
    [-11, -12, -23],
    [-16, -6, -10],
    [12, -2, -3],
    [13, 4, -12],
    [14, -2, -23],
    [8, 10, -20],
  ];

  // smaller objects movement
  useFrame(() => {
    // animate each object in the array
    objectRefs.forEach((el) => {
      el.position.y += 0.02;
      if (el.position.y > 19) el.position.y = -18;
      el.rotation.x += 0.06;
      el.rotation.y += 0.06;
      el.rotation.z += 0.02;
    });
  });
  return (
    <>
      {initialPositions.map((pos, i) => (
        <group
          key={i}
          position={[pos[0], pos[1], pos[2]]}
          ref={(ref) => (objectRefs[i] = ref!)}
        >
          <AlarmClock />
        </group>
      ))}
    </>
  );
};

export const Background = () => {
  const bumpMap = useTexture("/assets/obj/bump.jpg");
  const envMap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "/assets/obj/cube/" },
  );

  // We use `useResource` to be able to delay rendering the spheres until the material is ready
  const [material, set] = useState<any>(null);

  return (
    <>
      <MeshDistortMaterial
        ref={set}
        envMap={envMap}
        bumpMap={bumpMap}
        color={"#010101"}
        roughness={0.1}
        metalness={1}
        bumpScale={0.005}
        clearcoat={1}
        clearcoatRoughness={1}
        radius={1}
        distort={0.4}
      />
      <Instances />
    </>
  );
};
