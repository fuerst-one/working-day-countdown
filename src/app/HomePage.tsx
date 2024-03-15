"use client";

import React, { Suspense, useRef, useState } from "react";
import { LegalLinks } from "@/components/LegalLinks";
import { useGsap } from "@/hooks/useGsap";
import dayjs from "dayjs";
import { ClockAnimationType } from "@/components/ClockAnimation/AlarmClock/AlarmClockMain";
import dynamic from "next/dynamic";
import { Loading } from "@/components/Loading";

const ClockAnimation = dynamic(
  async () =>
    (await import("@/components/ClockAnimation/ClockAnimation")).ClockAnimation,
  {
    loading: () => <Loading />,
    ssr: false,
  },
);

export const HomePage = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [animation, setAnimation] = useState<ClockAnimationType>("alarm");

  const [date, setDate] = useState(dayjs().startOf("day"));
  const dateFormatted = dayjs(date).format("YYYY-MM-DD");
  const isInvalid = dayjs(date).isBefore(dayjs().endOf("day"));

  useGsap(
    containerRef.current,
    (gsap) => {
      if (!isLoaded) {
        return;
      }
      const tl = gsap.timeline();
      tl.to("#title", { duration: 1, opacity: 1 }, 0.25)
        .to("#date-input", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#show-countdown", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#legal-links", { duration: 1, opacity: 1 }, "-=0.75");
    },
    [isLoaded],
  );

  return (
    <main ref={containerRef} className="relative min-h-screen ">
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <h1 className="text-5xl text-white">
              Working Day Countdown Loading...
            </h1>
          }
        >
          <ClockAnimation
            animation={animation}
            onClockClick={() => setAnimation("push")}
            onLoad={() => setIsLoaded(true)}
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <h1
                id="title"
                className="z-10 mt-auto text-5xl font-bold opacity-25"
              >
                Working Day
                <br />
                Countdown
              </h1>
              {!isLoaded && <p>Loading...</p>}
              <input
                id="date-input"
                type="date"
                className="rounded-md px-8 py-4 text-black"
                style={{ opacity: 0 }}
                value={date.format("YYYY-MM-DD")}
                onChange={(event) => setDate(dayjs(event.target.value))}
              />
              <button
                id="show-countdown"
                className="rounded-md bg-orange-600 px-8 py-4 text-white opacity-0 disabled:cursor-not-allowed"
                onClick={() => (window.location.href = `/${dateFormatted}`)}
                disabled={isInvalid}
              >
                {isInvalid ? "Select a date" : "Show working day countdown"}
              </button>
              <div id="legal-links" className="z-10 mb-0 mt-auto opacity-0">
                <LegalLinks />
              </div>
            </div>
          </ClockAnimation>
        </Suspense>
      </div>
    </main>
  );
};
