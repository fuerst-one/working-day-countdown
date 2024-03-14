import React from "react";

export const Floor = (props: JSX.IntrinsicElements["mesh"]) => {
  return (
    <mesh {...props}>
      <circleGeometry args={[4]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};
