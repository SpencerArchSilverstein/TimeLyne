"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targTime: Date;
  eventName: string;
};

export default function Timer({ targTime, eventName }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = +targTime - +new Date();
    return difference > 0 ? difference : 0;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targTime]);

  const formatFormatTime = (label: string, num: number) => (
    <div className="flex flex-col items-center">
      <p className="text-5xl font-bold">{String(num).padStart(2, "0")}</p>
      <p className="text-sm font-semibold tracking-wide">
        {label}
        {num !== 1 ? "S" : ""}
      </p>
    </div>
  );

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const dayTime = [
      { label: "DAY", unit: days },
      { label: "HOUR", unit: hours },
      { label: "MINUTE", unit: minutes },
      { label: "SECOND", unit: seconds },
    ];

    return (
      <div className="flex flex-wrap justify-center gap-6 text-center">
        {dayTime.map((unitz, index) => (
          <div key={index}>{formatFormatTime(unitz.label, unitz.unit)}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="border-2 border-black rounded-3xl max-w-130 p-5 text-center bg-gray-100">
      <h1 className="text-2xl break-words mb-5">{eventName}</h1>
      <div className="text-2xl font-bold text-center">
        {formatTime(timeLeft)}
      </div>
      <hr className="mt-5" />
      <p className="mt-4 text-sm  font-bold">
        {targTime.toLocaleString("en-US", {
          timeZone: "America/New_York",
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
    </div>
  );
}
