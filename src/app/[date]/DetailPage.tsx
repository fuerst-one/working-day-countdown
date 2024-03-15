"use client";

import dayjs from "dayjs";
import React, { Suspense, useRef, useState } from "react";
import { LegalLinks } from "../../components/LegalLinks";
import { useEffect } from "react";
import { writeFavicon } from "./writeFavicon";
import { useGsap } from "@/hooks/useGsap";
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

const getWorkingDaysLeft = (targetDate: dayjs.Dayjs) => {
  let workingDaysLeft = 0;
  let currentDate = dayjs();
  while (currentDate.isBefore(targetDate)) {
    if (currentDate.day() !== 0 && currentDate.day() !== 6) {
      workingDaysLeft++;
    }
    currentDate = dayjs(currentDate).add(1, "day");
  }
  return workingDaysLeft;
};

export const DetailPage = ({ date }: { date: string }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const targetDate = dayjs(date, "YYYY-MM-DD");
  const workingDaysLeft = getWorkingDaysLeft(targetDate);

  const [animation, setAnimation] = useState<ClockAnimationType>(() =>
    workingDaysLeft > 0 ? "idle" : "alarm",
  );

  useEffect(() => {
    writeFavicon(workingDaysLeft.toString());
    const timeout = setTimeout(
      () => {
        window.location.reload();
      },
      1000 * 60 * 60,
    ); // every hour
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGsap(
    containerRef.current,
    (gsap) => {
      if (!isLoaded) {
        return;
      }
      const tl = gsap.timeline();
      tl.to("#title", { duration: 1, opacity: 1 }, 0.25)
        .to("#date", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#units", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#copy-button", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#legal-links", { duration: 1, opacity: 1 }, "-=0.75");
    },
    [isLoaded],
  );

  const content =
    workingDaysLeft === 0 ? (
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-center">
        <h1 className="z-10 text-6xl font-bold">You made it</h1>
        <p className="z-10 text-2xl">You have reached your target date.</p>
        {!isLoaded && <p>Loading...</p>}
      </div>
    ) : (
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-center">
        <h1 id="title" className="z-10 mt-auto text-6xl font-bold opacity-0">
          {workingDaysLeft} working days left
        </h1>
        {!isLoaded && <p>Loading...</p>}
        <p id="date" className="z-10 text-2xl opacity-0">
          until {targetDate.toDate().toLocaleDateString()}
          <br />
          <span className="text-sm text-gray-500">(excluding today)</span>
        </p>
        <p id="units" className="z-10 text-2xl opacity-0">
          = {workingDaysLeft * 8} working hours
          <br />= {workingDaysLeft * 8 * 60} minutes
          <br />= {workingDaysLeft * 8 * 60 * 60} seconds
        </p>
        <button
          id="copy-button"
          className="z-10 rounded-md bg-orange-600 px-8 py-4 text-white opacity-0"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          Copy link
        </button>
        <div id="legal-links" className="opacity-0">
          <LegalLinks className="z-10 mb-0 mt-auto" />
        </div>
      </div>
    );

  return (
    <main
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center gap-8 p-24"
    >
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <h1 className="text-6xl text-white">
              Working Day Countdown Loading...
            </h1>
          }
        >
          <ClockAnimation
            animation={animation}
            onClockClick={() => setAnimation("push")}
            onLoad={() => setIsLoaded(true)}
          >
            {content}
          </ClockAnimation>
        </Suspense>
      </div>
    </main>
  );
};
