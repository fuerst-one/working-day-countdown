import { ClockAnimationType } from "@/components/ClockAnimation/AlarmClock/AlarmClockMain";
import dynamic from "next/dynamic";
import React, { ReactNode, useState } from "react";

const ClockAnimation = dynamic(async () => (await import("@/components/ClockAnimation/ClockAnimation")).ClockAnimation, {
  ssr: false,
});

export const HomePageAnimation = ({
  onLoad,
  children,
}: {
  onLoad: () => void;
  children: ReactNode;
}) => {
  const [animation, setAnimation] = useState<ClockAnimationType>("alarm");

  return (
    <ClockAnimation
      animation={animation}
      onClockClick={() => setAnimation("push")}
      onLoad={onLoad}
    >
      {children}
    </ClockAnimation>
  );
};
