import { Box, Html } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import React, { FC, ReactNode, useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";

type DisplayProps = JSX.IntrinsicElements["group"] & {
  onLoad?: () => void;
  children?: ReactNode;
};

export const Display: FC<DisplayProps> = ({ onLoad, children, ...props }) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  useFrame(({ clock, mouse }) => {
    const rigidBody = rigidBodyRef.current;
    if (!rigidBody) {
      return;
    }
    const time = clock.getElapsedTime();
    const x = Math.sin(time) * 0.1;
    const y = Math.cos(time) * 0.1;
    rigidBody.setTranslation({ x, y, z: 0 }, false);

    const { x: mouseX, y: mouseY } = mouse;
    const xForce = (mouseX - x) * 10;
    const yForce = (mouseY - y) * 10;
    rigidBody.applyImpulse({ x: xForce, y: yForce, z: 0 }, true);

    const { x: xVel, y: yVel } = rigidBody.linvel();
    const xDamp = -xVel * 0.2;
    const yDamp = -yVel * 0.2;
    rigidBody.applyImpulse({ x: xDamp, y: yDamp, z: 0 }, true);
  });

  return (
    <RigidBody ref={rigidBodyRef} type="kinematicPosition" colliders="hull">
      <group {...props}>
        <Box args={[2.7, 4, 0.4]} castShadow receiveShadow>
          <meshPhongMaterial color="#191919" />
        </Box>
        <Html
          position={[0, 0, 0.201]}
          transform
          occlude="blending"
          scale={0.25}
        >
          <DisplayContent onLoad={onLoad}>{children}</DisplayContent>
        </Html>
      </group>
    </RigidBody>
  );
};

const DisplayContent = ({
  onLoad,
  children,
}: {
  onLoad?: () => void;
  children: ReactNode;
}) => {
  useEffect(() => {
    onLoad?.();
  }, [onLoad]);
  return <div className="h-[610px] w-[410px] bg-[#1b1b1b] p-4">{children}</div>;
};
