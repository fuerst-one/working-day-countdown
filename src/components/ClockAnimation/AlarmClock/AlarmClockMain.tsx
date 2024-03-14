import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Model } from "./Model";
import { useGsap } from "@/hooks/useGsap";
import { animateAlarm, animateIdle, animatePush } from "./animations";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { AlarmClock } from "./AlarmClock";
import { useFrame } from "react-three-fiber";
import { Sphere } from "@react-three/drei";

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

  /* useGsap(
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
    [animation]
  ); */

  return (
    <RigidBody ref={rigidBodyRef} colliders="hull">
      <AlarmClock
        {...props}
        onClick={() => rigidBodyRef.current?.applyImpulse(
          { x: 0, y: 0, z: -3 },
          true
        )}
      />
    </RigidBody>
  );
};
