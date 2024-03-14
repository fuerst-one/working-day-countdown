import React, { useState } from "react";
import { Model } from "./Model";
import { useTexture, useCubeTexture, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export const AlarmClock = (props: JSX.IntrinsicElements["group"]) => {
  const bumpMap = useTexture("/assets/obj/bump.jpg");
  const envMap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "/assets/obj/cube/" }
  );

  // We use `useResource` to be able to delay rendering the spheres until the material is ready
  const [material, set] = useState<any>(null);
  
  return (
    <>
      <MeshDistortMaterial
        ref={set}
        envMap={envMap}
        bumpMap={bumpMap}
        color={"#00e8fd"} 
        roughness={0.1}
        metalness={1}
        bumpScale={.5}
        clearcoat={1}
        clearcoatRoughness={1}
        distort={0.1}
        side={THREE.DoubleSide}
      />
      <group {...props}>
        <Model position={[0, -0.8, 0]} material={material} />
      </group>
    </>
  );
};
