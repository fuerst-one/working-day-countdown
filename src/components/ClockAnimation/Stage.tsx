import { RigidBody } from "@react-three/rapier";
import React from "react";
import { Cylinder } from "@react-three/drei";

export const Stage = (props: JSX.IntrinsicElements["mesh"]) => {
  return (
    <RigidBody type="fixed" colliders="hull">
      <Cylinder {...props} args={[4, 4, 0.3, 90]} castShadow receiveShadow>
        <meshPhongMaterial color="#799c9f" shadowSide={2} reflectivity={1} />
      </Cylinder>
    </RigidBody>
  );
};
