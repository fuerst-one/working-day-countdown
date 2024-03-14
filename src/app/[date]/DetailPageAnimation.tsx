import { ClockAnimationType } from "@/components/ClockAnimation/AlarmClock/AlarmClock";
import { ClockAnimation } from "@/components/ClockAnimation/ClockAnimation";
import React, { useState } from "react";

export const DetailPageAnimation = ({ isIdle }: { isIdle?: boolean }) => {
  const [animation, setAnimation] = useState<ClockAnimationType>(
    isIdle ? "idle" : "alarm",
  );

  return (
    <ClockAnimation
      animation={animation}
      onClockClick={() => setAnimation("push")}
    />
  );
};
