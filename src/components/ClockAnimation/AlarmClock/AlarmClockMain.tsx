import React from "react";
import { RigidBody } from "@react-three/rapier";
import { AlarmClock } from "./AlarmClock";

export type ClockAnimationType = "idle" | "alarm" | "alarm-delayed" | "push";

type AlarmClockProps = Omit<JSX.IntrinsicElements["group"], "ref"> & {
  animation?: ClockAnimationType;
  onClick?: () => void;
};

export const AlarmClockMain = ({ onClick, ...props }: AlarmClockProps) => {
  return (
    <RigidBody restitution={0.2} colliders="hull">
      <AlarmClock {...props} onClick={onClick} />
    </RigidBody>
  );
};
