import React, { useRef } from "react";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { AlarmClock } from "./AlarmClock";

export type ClockAnimationType = "idle" | "alarm" | "alarm-delayed" | "push";

type AlarmClockProps = Omit<JSX.IntrinsicElements["group"], "ref"> & {
  animation?: ClockAnimationType;
  onClick?: () => void;
};

export const AlarmClockMain = ({ onClick, ...props }: AlarmClockProps) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  return (
    <RigidBody ref={rigidBodyRef} restitution={0.2} colliders="hull">
      <AlarmClock
        {...props}
        onClick={() => {
          onClick?.();
          rigidBodyRef.current?.applyImpulse({ x: 0, y: 0, z: -3 }, true);
        }}
      />
    </RigidBody>
  );
};
