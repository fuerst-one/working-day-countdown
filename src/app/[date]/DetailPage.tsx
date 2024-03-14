"use client";

import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { LegalLinks } from "../../components/LegalLinks";
import { useEffect } from "react";
import { writeFavicon } from "./writeFavicon";
import { useGsap } from "@/hooks/useGsap";
import { DetailPageAnimation } from "./DetailPageAnimation";

export const DetailPage = ({ date }: { date: string }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const targetDate = dayjs(date, "YYYY-MM-DD");

  let workingDaysLeft = 0;
  let currentDate = dayjs();
  while (currentDate.isBefore(targetDate)) {
    if (currentDate.day() !== 0 && currentDate.day() !== 6) {
      workingDaysLeft++;
    }
    currentDate = dayjs(currentDate).add(1, "day");
  }

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
      tl.to("#animation", { duration: 1, opacity: 1 }, 0)
        .to("#title", { duration: 1, opacity: 1 }, 0.25)
        .to("#date", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#units", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#copy-button", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#legal-links", { duration: 1, opacity: 1 }, "-=0.75");
    },
    [isLoaded],
  );

  if (workingDaysLeft === 0) {
    return (
      <main
        ref={containerRef}
        className="relative flex min-h-screen flex-col items-center justify-center gap-8 p-24"
      >
        <div id="animation" className="absolute inset-0 z-0 opacity-0">
          <DetailPageAnimation isIdle={false} onLoad={() => setIsLoaded(true)}>
            <div className="flex flex-col items-center justify-center gap-8 w-[400px]">
              <h1 className="text-6xl font-bold z-10">You made it</h1>
              <p className="text-2xl z-10">
                You have reached your target date.
              </p>
              {!isLoaded && <p>Loading...</p>}
            </div>
          </DetailPageAnimation>
        </div>
      </main>
    );
  }

  return (
    <main
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center gap-8 p-8 sm:p-16 md:p-24"
    >
      <div id="animation" className="absolute inset-0 z-0 opacity-0">
        <DetailPageAnimation isIdle={true} onLoad={() => setIsLoaded(true)}>
          <div className="flex flex-col items-center justify-center gap-8 w-[400px] p-8 bg-[#151515]">
            <h1
              id="title"
              className="mt-auto text-6xl font-bold z-10 opacity-0  text-center"
            >
              {workingDaysLeft} working days left
            </h1>
            {!isLoaded && <p>Loading...</p>}
            <p id="date" className="text-2xl text-center z-10 opacity-0">
              until {targetDate.toDate().toLocaleDateString()}
              <br />
              <span className="text-sm text-gray-500">(excluding today)</span>
            </p>
            <p id="units" className="text-2xl z-10 opacity-0">
              = {workingDaysLeft * 8} working hours
              <br />= {workingDaysLeft * 8 * 60} minutes
              <br />= {workingDaysLeft * 8 * 60 * 60} seconds
            </p>
            <button
              id="copy-button"
              className="py-4 px-8 bg-blue-500 text-white rounded-md z-10 opacity-0"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              Copy link
            </button>
            <div id="legal-links" className="opacity-0">
              <LegalLinks className="mt-auto mb-0 z-10" />
            </div>
          </div>
        </DetailPageAnimation>
      </div>
    </main>
  );
};
