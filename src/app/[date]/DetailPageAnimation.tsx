import { ClockAnimationType } from "@/components/ClockAnimation/AlarmClock/AlarmClockMain";
import { ClockAnimation } from "@/components/ClockAnimation/ClockAnimation";
import React, { ReactNode, useState } from "react";

export const DetailPageAnimation = ({ isIdle, onLoad, children }: { isIdle?: boolean, onLoad: () => void, children?: ReactNode }) => {
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
