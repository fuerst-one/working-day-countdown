"use client";

import React, { useRef, useState } from "react";
import { DateSelector } from "@/components/DateSelector";
import { LegalLinks } from "@/components/LegalLinks";
import { useGsap } from "@/hooks/useGsap";
import { HomePageAnimation } from "./HomePageAnimation";

export const HomePage = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useGsap(
    containerRef.current,
    (gsap) => {
      if (!isLoaded) {
        return;
      }
      const tl = gsap.timeline();
      tl.to("#title", { duration: 1, opacity: 1 })
        .to("#date-input", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#show-countdown", { duration: 1, opacity: 1 }, "-=0.75")
        .to("#animation", { duration: 1.5, opacity: 1 }, 0)
    },
    [isLoaded]
  );

  return (
    <main ref={containerRef} className="relative min-h-screen ">
      <div id="animation" className="absolute inset-0 z-0 opacity-0">
        <HomePageAnimation onLoad={() => setIsLoaded(true)}>
          <div className="flex flex-col items-center justify-center gap-8 w-[400px]">
            <h1
              id="title"
              className="mt-auto text-6xl font-bold z-10 opacity-25 text-center"
            >
              Working Day
              <br />
              Countdown
            </h1>
            {!isLoaded && <p>Loading...</p>}
            <div id="date-selector" className="flex flex-col gap-4 z-10">
              <DateSelector />
            </div>
            <div id="legal-links" className="mt-auto mb-0 z-10">
              <LegalLinks />
            </div>
          </div>
        </HomePageAnimation>
      </div>
    </main>
  );
};
