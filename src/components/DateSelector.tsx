"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export const DateSelector = () => {
  const router = useRouter();
  const [date, setDate] = useState(dayjs().startOf("day"));
  const dateFormatted = dayjs(date).format("YYYY-MM-DD");
  const isInvalid = dayjs(date).isBefore(dayjs().endOf("day"));

  return (
    <>
      <input
        id="date-input"
        type="date"
        className="py-4 px-8 text-black rounded-md"
        style={{ opacity: 0 }}
        value={date.format("YYYY-MM-DD")}
        onChange={(event) => setDate(dayjs(event.target.value))}
      />
      <button
        id="show-countdown"
        className="py-4 px-8 bg-blue-500 text-white rounded-md disabled:cursor-not-allowed opacity-0"
        onClick={() => router.push(`/${dateFormatted}`)}
        disabled={isInvalid}
      >
        {isInvalid ? "Select a date" : "Show working day countdown"}
      </button>
    </>
  );
};
