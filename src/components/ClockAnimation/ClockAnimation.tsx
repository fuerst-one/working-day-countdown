import React, { ReactNode, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ClockAnimationType } from "./AlarmClock/AlarmClockMain";
import { Floor } from "./Floor";
import { Background } from "./Background";
import { OrbitControls } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
  Noise,
} from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import { AlarmClockMain } from "./AlarmClock/AlarmClockMain";
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
        <Suspense fallback={null}>
          <Background />
          <Physics gravity={[0, -4.8, 0]} interpolate={false} colliders={false}>
            <AlarmClockMain
              position={[-1.5, 1, 0]}
              rotation={[0.13, 0.05, 0]}
              animation={animation}
              onClick={onClockClick}
            />
            <Display position={[0.5, 0.4, -3]} rotation={[0, -0.2, 0]}>
              {children}
            </Display>
            <Floor
              onAfterRender={onLoad}
              receiveShadow
              position={[-1.8, -2, -3]}
            />
          </Physics>
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <DepthOfField
              target={[0, 0, -3]}
              focalLength={0.03}
              bokehScale={14}
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
