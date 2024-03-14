"use client";

import React, { useRef } from "react";
import { DateSelector } from "@/components/DateSelector";
import { LegalLinks } from "@/components/LegalLinks";
import { useGsap } from "@/hooks/useGsap";
import { HomePageAnimation } from "./HomePageAnimation";

export const HomePage = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGsap(
    containerRef.current,
    (gsap) => {
      const tl = gsap.timeline();
      tl.to("#title", { duration: 1, opacity: 1 })
        .to("#date-input", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#show-countdown", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#background-animation", { duration: 1, opacity: 1 }, 0.75)
        .to("#title", { duration: 0.25, y: -30, x: 20, rotation: 10 }, 3);
    },
    [],
  );

  return (
    <main
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center gap-8 p-8 sm:p-16 md:p-24"
    >
      <div className="absolute inset-0 z-0">
        <HomePageAnimation />
      </div>
      <h1 id="title" className="mt-auto text-6xl font-bold z-10 opacity-25">
        Working Day
        <br />
        Countdown
      </h1>
      <div id="date-selector" className="flex flex-col gap-4 z-10">
        <DateSelector />
      </div>
      <div id="legal-links" className="mt-auto mb-0 z-10">
        <LegalLinks />
      </div>
    </main>
  );
};
