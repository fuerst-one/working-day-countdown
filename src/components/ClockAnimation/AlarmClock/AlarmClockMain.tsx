import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { AlarmClock } from "./AlarmClock";

export type ClockAnimationType = "idle" | "alarm" | "alarm-delayed" | "push";

type AlarmClockProps = Omit<JSX.IntrinsicElements["group"], "ref"> & {
  animation?: ClockAnimationType;
  delay?: number;
  onClick?: () => void;
};

export const AlarmClockMain = ({
  animation,
  delay,
  onClick,
  ...props
}: AlarmClockProps) => {
  const modelRef = useRef<THREE.Group>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  useEffect(() => {
    if (!animation) {
      return;
    }
    const rigidBody = rigidBodyRef.current;
    if (!rigidBody) {
      return;
    }
    if (animation === "alarm") {
      rigidBody.applyImpulse({ x: 1, y: 0, z: 0 }, true);
      rigidBody.applyImpulse({ x: -1, y: 0, z: 0 }, true);
    }
  }, [animation]);

  return (
    <RigidBody ref={rigidBodyRef} restitution={1.1} colliders="hull">
      <AlarmClock
        {...props}
        onClick={() =>
          rigidBodyRef.current?.applyImpulse({ x: 0, y: 0, z: -3 }, true)
        }
      />
    </RigidBody>
  );
};
