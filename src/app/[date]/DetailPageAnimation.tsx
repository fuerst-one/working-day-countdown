import { ClockAnimationType } from "@/components/ClockAnimation/AlarmClock/AlarmClockMain";
import dynamic from "next/dynamic";
import React, { ReactNode, useState } from "react";

const ClockAnimation = dynamic(
  async () =>
    (await import("@/components/ClockAnimation/ClockAnimation")).ClockAnimation,
  {
    ssr: false,
  }
);

export const DetailPageAnimation = ({
  isIdle,
  onLoad,
  children,
}: {
  isIdle?: boolean;
  onLoad: () => void;
  children?: ReactNode;
}) => {
  const [animation, setAnimation] = useState<ClockAnimationType>(
    isIdle ? "idle" : "alarm",
  );

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
