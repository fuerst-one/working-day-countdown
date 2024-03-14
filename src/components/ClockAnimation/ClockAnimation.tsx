import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AlarmClock, ClockAnimationType } from "./AlarmClock/AlarmClock";
import { Floor } from "./Floor";
import { Background } from "./Background/Background";
import { Html } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

type ClockAnimationProps = {
  animation?: ClockAnimationType;
  onClockClick?: () => void;
};

export const ClockAnimation = ({
  animation,
  onClockClick,
}: ClockAnimationProps) => {
  return (
    <div id="background-animation">
      <Canvas
        style={{ height: "100vh" }}
        shadows
        camera={{
          position: [0, 0, 5],
          fov: 50,
        }}
        gl={{
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: false,
        }}
      >
        <color attach="background" args={["#050505"]} />
        <fog color="#161616" attach="fog" near={8} far={30} />
        <Suspense fallback={<Html center>Loading.</Html>}>
          <ambientLight intensity={Math.PI * 0.9} castShadow />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
            castShadow
          />
          <Background />
          <group position={[-1, 0, 0]}>
            <AlarmClock
              position={[-0.5, 0, 0]}
              rotation={[0, 0.5, 0]}
              animation={animation}
              onClick={onClockClick}
              castShadow
            />
            <Floor
              position={[-0.8, -1, -3]}
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow
            />
          </group>
        </Suspense>
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            opacity={0.2}
          />
          <Vignette eskil={false} offset={0} darkness={0.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
