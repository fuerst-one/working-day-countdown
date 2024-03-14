import React, { ReactNode, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ClockAnimationType } from "./AlarmClock/AlarmClockMain";
import { Floor } from "./Floor";
import { Background } from "./Background/Background";
import { Float, Html, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, DepthOfField, Noise } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import { AlarmClockMain } from "./AlarmClock/AlarmClockMain";

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
        shadows="soft"
        camera={{
          position: [0, 0, 5],
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
        <fog color="#161616" attach="fog" near={8} far={30} />
        <ambientLight intensity={Math.PI} />
        <spotLight
          castShadow
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI * 0.8}
        />
        <OrbitControls />
        <Suspense fallback={null}>
          <Background />
          <Physics interpolate={false} colliders={false}>
            <AlarmClockMain
              position={[-1.5, 3, 0]}
              animation={animation}
              onClick={onClockClick}
            />
            <Floor
              receiveShadow
              position={[-1.8, -1, -3]}
              onAfterRender={() => {
                onLoad?.();
              }}
            />
          </Physics>
          <Float floatingRange={[0.1, 0.1]}>
            <Html
              transform
              occlude
              position={[0.5, 1, -3]}
              rotation={[0, 0.2, 0]}
              scale={.3}
            >
              <div className="w-[300px]">{children}</div>
            </Html>
          </Float>
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <DepthOfField
              focusDistance={0}
              focalLength={0.02}
              bokehScale={2}
              height={480}
            />
            <Bloom
              luminanceThreshold={0}
              luminanceSmoothing={0.9}
              height={300}
              opacity={3}
            />
            <Noise opacity={0.025} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};
