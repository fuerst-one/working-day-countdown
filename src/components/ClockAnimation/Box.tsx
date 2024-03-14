import { useRef, useState } from "react";
import * as THREE from "three";
import { MeshProps } from "react-three-fiber";
import { useGsap } from "@/hooks/useGsap";

export const Box = (props: MeshProps) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useGsap(ref.current, (gsap) => {
    const box = ref.current;
    if (!box) return;
    const tl = gsap.timeline();
    tl.to(
      box.position,
      {
        y: 2,
        duration: 1,
        repeat: -1,
        yoyoEase: "power2.in",
      },
      0,
    ).to(
      box.rotation,
      {
        y: Math.PI,
        duration: 1,
        repeat: -1,
        ease: "linear",
      },
      0,
    );
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        ref={materialRef}
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
};
