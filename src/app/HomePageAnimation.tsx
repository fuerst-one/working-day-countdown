import { ClockAnimationType } from "@/components/ClockAnimation/AlarmClock/AlarmClock";
import { ClockAnimation } from "@/components/ClockAnimation/ClockAnimation";
import React, { useState } from "react";

export const HomePageAnimation = () => {
  const [animation, setAnimation] =
    useState<ClockAnimationType>("alarm-delayed");

  return (
    <ClockAnimation
      animation={animation}
      onClockClick={() => setAnimation("push")}
    />
  );
};
