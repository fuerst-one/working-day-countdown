import React, { useRef } from "react";
import {
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { AlarmClock } from "./AlarmClock";

export type ClockAnimationType = "idle" | "alarm" | "alarm-delayed" | "push";

type AlarmClockProps = Omit<JSX.IntrinsicElements["group"], "ref"> & {
  animation?: ClockAnimationType;
};

export const AlarmClockMain = ({
  position,
  rotation,
  ...props
}: AlarmClockProps) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  const respawnClock = () => {
    const [x, y, z] = (position as [number, number, number]) ?? [0, 0, 0];
    rigidBodyRef.current?.setTranslation({ x, y, z }, false);
    rigidBodyRef.current?.setLinvel({ x: 0, y: 0, z: 0 }, false);
    rigidBodyRef.current?.setRotation(
      {
        x: Math.random() * Math.PI,
        y: Math.random() * Math.PI,
        z: Math.random() * Math.PI,
        w: Math.random() * Math.PI,
      },
      false,
    );
  };

  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        position={position}
        rotation={rotation}
        restitution={0}
        friction={0.5}
        colliders="hull"
      >
        <AlarmClock
          {...props}
          onClick={(event) => {
            props.onClick?.(event);
            rigidBodyRef.current?.applyImpulse({ x: 0, y: 0, z: -3 }, true);
          }}
        />
      </RigidBody>
      <CylinderCollider
        sensor
        args={[0.1, 500]}
        position={[0, -5, 0]}
        onIntersectionEnter={respawnClock}
      />
    </>
  );
};
