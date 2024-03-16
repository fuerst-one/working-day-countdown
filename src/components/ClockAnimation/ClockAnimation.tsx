import React, { ReactNode, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
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
  onLoad?: () => void;
  onClockClick?: () => void;
  children?: ReactNode;
};

export const ClockAnimation = ({
  animation,
  onLoad,
  onClockClick,
  children,
}: ClockAnimationProps) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [isPointerBusy, setIsPointerBusy] = useState(false);

  return (
    <div
      ref={(ref) => setRef(ref)}
      id="background-animation"
      className="relative"
    >
      <Canvas
        eventSource={ref!}
        eventPrefix="client"
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
        <OrbitControls enabled={!isPointerBusy} />
        <Suspense
          fallback={
            <Text position={[0, 0, -10]} color="white">
              Loading Stage...
            </Text>
          }
        >
          <Background />
          <Physics colliders={false}>
            <AlarmClockMain
              position={[-1.8, 5, -2]}
              animation={animation}
              onClick={onClockClick}
              onPointerDown={() => setIsPointerBusy(true)}
              onPointerUp={() => setIsPointerBusy(false)}
            />
            <Display
              position={[0.5, 0.4, -3]}
              rotation={[0, -0.2, 0]}
              onLoad={onLoad}
            >
              {children}
            </Display>
            <Stage receiveShadow position={[-1.8, -2, -3]} />
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
