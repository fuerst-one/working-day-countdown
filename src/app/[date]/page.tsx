"use client";

import dayjs from "dayjs";
import { LegalLinks } from "../../components/LegalLinks";

export default function Date({
  params: { date },
}: {
  params: { date: string };
}) {
  const targetDate = dayjs(date, "YYYY-MM-DD");

  if (targetDate.isBefore(dayjs())) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
        <h1 className="text-6xl font-bold">You made it</h1>
      </main>
    );
  }
  
  let workingDaysLeft = 0;
  let currentDate = dayjs();
  while (currentDate.isBefore(targetDate)) {
    if (currentDate.day() !== 0 && currentDate.day() !== 6) {
      workingDaysLeft++;
    }
    currentDate = dayjs(currentDate).add(1, "day");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 sm:p-16 md:p-24">
      <h1 className="mt-auto text-6xl font-bold">
        {workingDaysLeft} working days left
      </h1>
      <p className="text-2xl">
        until {targetDate.toDate().toLocaleDateString()}
      </p>
      <p className="text-2xl">
        = {workingDaysLeft * 8} working hours
        <br />= {workingDaysLeft * 8 * 60} minutes
        <br />= {workingDaysLeft * 8 * 60 * 60} seconds
      </p>
      <p className="text-sm text-gray-500">(excluding today)</p>
      <button
        className="py-4 px-8 bg-blue-500 text-white rounded-md"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
        }}
      >
        Copy link
      </button>
      <LegalLinks className="mt-auto mb-0" />
    </main>
  );
}
