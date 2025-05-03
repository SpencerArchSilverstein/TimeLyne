"use client";
import Image from "next/image";
import Timer from "./Timer";
import { eventNames } from "process";
export default function Home() {
  function c() {
    console.log("A");
  }
  const dummyEvent = "Graduation";
  const dat = [
    { date: "2025-06-16T17:00:00", eventName: "Graduation" },
    { date: "2025-06-16T17:00:00", eventName: "Graduation2" },
    { date: "2025-06-16T17:00:00", eventName: "Graduation3" },
    { date: "2025-06-16T17:00:00", eventName: "Graduation4" },
    { date: "2025-06-16T17:00:00", eventName: "Graduation5" },
  ];
  return (
    <>
      <div className="border-2 border-gray-500 bg-gray-50 m-10 rounded-3xl shadow-2xl">
        <div className="flex flex-row flex-wrap justify gap-5 p-10 shadow-2xl ">
          {dat.map((t, index) => (
            <div key={index}>
              <Timer targTime={new Date(t.date)} eventName={t.eventName} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
