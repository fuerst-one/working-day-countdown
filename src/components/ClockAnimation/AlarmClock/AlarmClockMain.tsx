import React, { useEffect, useRef, useState } from "react";
import {
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { AlarmClock } from "./AlarmClock";
import { ThreeEvent, useFrame } from "react-three-fiber";
import * as THREE from "three";

export type ClockAnimationType = "idle" | "alarm" | "alarm-delayed" | "push";

const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

type AlarmClockProps = Omit<JSX.IntrinsicElements["group"], "ref"> & {
  animation?: ClockAnimationType;
};

export const AlarmClockMain = ({
  position,
  rotation,
  onPointerUp,
  onPointerDown,
  ...props
}: AlarmClockProps) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const modelRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);

  const respawnClock = () => {
    const [x, y, z] = (position as [number, number, number]) ?? [0, 0, 0];
    rigidBodyRef.current?.setTranslation({ x, y, z }, false);
    rigidBodyRef.current?.setLinvel({ x: 0, y: 0, z: 0 }, false);
  };

  useFrame(({ camera, pointer }) => {
    if (!isDragging || !modelRef.current) {
      return;
    }
    const planeIntersectPoint = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, camera);
    const intersection = raycaster.ray.intersectPlane(
      floorPlane,
      planeIntersectPoint,
    );
    if (!intersection) {
      return;
    }
    const dx = intersection.x - modelRef.current.position.x * 0.1;
    const dz = intersection.z - modelRef.current.position.z * 0.1;
    rigidBodyRef.current?.setTranslation({ x: dx, y: 0.1, z: dz }, false);
    rigidBodyRef.current?.setLinvel({ x: 0, y: 0, z: 0 }, false);
  });

  // Wake up the clock when it's not being dragged otherwise listen for pointerup
  useEffect(() => {
    if (!isDragging) {
      rigidBodyRef.current?.wakeUp();
    }
    const listener = () => {
      setIsDragging(false);
      onPointerUp?.({} as ThreeEvent<PointerEvent>);
    };
    window.addEventListener("pointerup", listener);
    return () => window.removeEventListener("pointerup", listener);
  }, [isDragging, onPointerUp]);

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
          modelRef={modelRef}
          onPointerDown={(event) => {
            onPointerDown?.(event);
            setIsDragging(true);
          }}
          onPointerUp={(event) => {
            onPointerUp?.(event);
            setIsDragging(false);
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
