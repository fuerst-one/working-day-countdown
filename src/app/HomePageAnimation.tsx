import { ClockAnimationType } from "@/components/ClockAnimation/AlarmClock/AlarmClockMain";
import { ClockAnimation } from "@/components/ClockAnimation/ClockAnimation";
import React, { ReactNode, useState } from "react";

export const HomePageAnimation = ({
  onLoad,
  children,
}: {
  onLoad: () => void;
  children: ReactNode;
}) => {
  const [animation, setAnimation] =
    useState<ClockAnimationType>("alarm-delayed");

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
