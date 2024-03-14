import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import React from "react";
import { Cylinder, PointMaterial } from "@react-three/drei";

export const Floor = (props: JSX.IntrinsicElements["mesh"]) => {
  return (
    <RigidBody type="fixed" colliders="hull">
      <Cylinder {...props} args={[4, 4, .05]}>
        <meshBasicMaterial color="gray" shadowSide={2} side={THREE.DoubleSide} />
      </Cylinder>
    </RigidBody>
  );
};
