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

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(days).padStart(2, "0")}:${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <>
      <div className="border-2 border-black rounded-3xl w-75 p-5 text-center bg-gray-100 ">
        <h1 className="text-2xl break-words">Time Until {eventName}</h1>
        <div className="text-2xl font-bold text-center">
          {formatTime(timeLeft)}
        </div>
      </div>
    </>
  );
}
