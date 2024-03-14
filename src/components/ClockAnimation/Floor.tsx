import { RigidBody } from "@react-three/rapier";
import React from "react";
import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

export const Floor = (props: JSX.IntrinsicElements["mesh"]) => {
  return (
    <RigidBody type="fixed" colliders="hull">
      <Cylinder {...props} args={[4, 4, 0.3, 90]} castShadow receiveShadow>
        <meshPhongMaterial
          color="#799c9f"
          shininess={10}
          shadowSide={2}
          side={THREE.DoubleSide}
        />
      </Cylinder>
    </RigidBody>
  );
};
