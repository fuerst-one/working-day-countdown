import * as THREE from "three";
import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { AlarmClock } from "../AlarmClock/AlarmClock";

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
  return (
    <Instances />
  );
};
