import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Model } from "./Model";
import { useGsap } from "@/hooks/useGsap";
import { animateAlarm, animateIdle, animatePush } from "./animations";

export type ClockAnimationType = "idle" | "alarm" | "alarm-delayed" | "push";

type AlarmClockProps = Omit<JSX.IntrinsicElements["group"], "ref"> & {
  animation?: ClockAnimationType;
  delay?: number;
  onClick?: () => void;
};

export const AlarmClock = ({
  animation,
  delay,
  onClick,
  ...props
}: AlarmClockProps) => {
  const modelRef = useRef<THREE.Group>(null);

  useGsap(
    modelRef.current,
    (gsap) => {
      if (!animation) {
        return;
      }
      const model = modelRef.current;
      if (!model) {
        return;
      }
      const tl = gsap.timeline();

      if (animation === "idle") {
        animateIdle(model, -1)(tl);
      }
      if (animation === "push") {
        animatePush(model)(tl);
      }
      if (animation.startsWith("alarm")) {
        if (animation === "alarm-delayed") {
          animateIdle(model)(tl);
        }
        animateAlarm(model)(tl);
      }
    },
    [animation],
  );

  const centerOffset = 0.5;

  return (
    <group {...props} ref={modelRef} onClick={onClick}>
      <group position={[0, -centerOffset, 0]}>
        <Model position={[0, centerOffset + 0.1, 0]} />
      </group>
    </group>
  );
};
