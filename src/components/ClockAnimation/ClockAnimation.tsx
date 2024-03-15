import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CylinderCollider, Physics } from "@react-three/rapier";
import {
  OrbitControls,
  Environment,
  Lightformer,
  Text,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
  Noise,
} from "@react-three/postprocessing";
import { AlarmClockMain } from "./AlarmClock/AlarmClockMain";
import { ClockAnimationType } from "./AlarmClock/AlarmClockMain";
import { Background } from "./Background";
import { Stage } from "./Stage";
import { Display } from "./Display";

type ClockAnimationProps = {
  animation?: ClockAnimationType;
  onClockClick?: () => void;
  onLoad?: () => void;
  children?: ReactNode;
};

export const ClockAnimation = ({
  animation,
  onClockClick,
  onLoad,
  children,
}: ClockAnimationProps) => {
  const [showClock, setShowClock] = useState(true);

  const respawnClock = () => {
    if (!showClock) {
      return;
    }
    setShowClock(false);
  };

  useEffect(() => {
    if (showClock) {
      return;
    }
    const timeout = setTimeout(() => setShowClock(true), 3000);
    return () => clearTimeout(timeout);
  }, [showClock]);

  return (
    <div id="background-animation" className="relative">
      <Canvas
        style={{ height: "100vh" }}
        shadows
        camera={{
          position: [0, 1, 5],
          rotation: [0, -0.2, 0],
          fov: 50,
        }}
        gl={{
          powerPreference: "high-performance",
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }}
      >
        <color attach="background" args={["#141414"]} />
        <fog color="#181818" attach="fog" near={8} far={30} />
        <ambientLight intensity={Math.PI} />
        <spotLight
          castShadow
          position={[8, 14, 8]}
          angle={0.2}
          penumbra={1}
          decay={0}
          intensity={5}
        />
        <OrbitControls />
        <Suspense
          fallback={
            <Text position={[0, 0, 0]} color="white">
              Loading Stage...
            </Text>
          }
        >
          <Background />
          <Physics
            /* gravity={[0, -4.8, 0]} */
            interpolate={false}
            colliders={false}
          >
            {showClock && (
              <AlarmClockMain
                position={[-1.8, 3, -2]}
                rotation={[0.13, 0.05, 0]}
                animation={animation}
                onClick={onClockClick}
              />
            )}
            <Display
              position={[0.5, 0.4, -3]}
              rotation={[0, -0.2, 0]}
              onLoad={onLoad}
            >
              {children}
            </Display>
            <Stage receiveShadow position={[-1.8, -2, -3]} />
            <CylinderCollider
              sensor
              args={[0.1, 500]}
              position={[0, -8, 0]}
              onIntersectionEnter={respawnClock}
            />
          </Physics>
          <Environment resolution={256}>
            <Lightformer
              intensity={0.5}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
            />
          </Environment>
          <EffectComposer multisampling={0}>
            <DepthOfField
              target={[0, 0, -3]}
              focalLength={0.05}
              bokehScale={10}
              height={700}
            />
            <Bloom
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              height={300}
              opacity={3}
            />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};
