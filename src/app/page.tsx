"use client";
import Image from "next/image";
import Timer from "./Timer";
import { Card } from "@mui/material";
import Gague from "./Gague";

export default function Home() {
  const dummyEvent = "Graduation";
  const dat = [
    {
      date: "2025-07-02T08:30:00",
      eventName: "July Trip: Maddie Arrives NYC",
      tag: "Maddie",
    },
  ];
  return (
    <>
      <h1 className="text-center mt-10 font-bold text-5xl">TIMELYNE</h1>
      <div className="border-2 border-gray-500 bg-gray-50 m-10 rounded-3xl ">
        <h3 className="text-center mt-10 font-bold text-4xl">{dat[0].tag}</h3>
        <div className="flex flex-row flex-wrap justify gap-5 p-10 justify-center">
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
