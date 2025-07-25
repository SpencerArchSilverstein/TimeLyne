import React from "react";
import Timer from "./Timer";

type EventItem = {
  date: string;
  eventName: string;
  tag: string;
};

const dat: EventItem[] = [
  {
    date: "2025-07-30T21:00:00-04:00",
    eventName: "Maddie NYC August Trip",
    tag: "Maddie",
  },
  {
    date: "2025-08-30T10:40:00-04:00",
    eventName: "Archie UVA Aug/Sept Trip",
    tag: "Maddie",
  },
  {
    date: "2025-07-25T23:59:59-04:00",
    eventName: "Freddie Gibbs & The Alchemist: Alfredo II",
    tag: "Album Release",
  },
  {
    date: "2025-08-07T23:59:59-04:00",
    eventName: "JID: God Does Like Ugly",
    tag: "Album Release",
  },
  {
    date: "2025-08-07T23:59:59-04:00",
    eventName: "Amaarae: Black Star",
    tag: "Album Release",
  },
  {
    date: "2025-08-15T23:59:59-04:00",
    eventName: "Joey Valence & Brae: Hyperyouth",
    tag: "Album Release",
  },
  {
    date: "2025-08-28T23:59:59-04:00",
    eventName: "Sabrina Carpenter: Man's Best Friend",
    tag: "Album Release",
  },
  {
    date: "2025-09-11T19:00:00-04:00",
    eventName: "McKinley Dixon Concert",
    tag: "Concert",
  },
  {
    date: "2025-09-25T19:00:00-04:00",
    eventName: "Viagra Boys Concert",
    tag: "Concert",
  },

  {
    date: "2025-10-18T19:00:00-04:00",
    eventName: "Quadeca Concert",
    tag: "Concert",
  },
  {
    date: "2025-10-24T19:00:00-04:00",
    eventName: "Joey Valence & Brae Concert",
    tag: "Concert",
  },
];

const targetTag = "Maddie";

const sectionOne = dat.filter((item) => item.tag === "Maddie");
const sectionTwo = dat.filter((item) => item.tag == "Album Release");
const sectionThree = dat.filter((item) => item.tag == "Concert");

const renderSection = (events: EventItem[], title: string) => {
  if (events.length === 0) return null;

  return (
    <div className="border-2 border-gray-500 bg-gray-50 m-10 rounded-3xl">
      <div className="flex flex-col items-center gap-10 p-10">
        <h2 className="text-3xl font-semibold text-center">{title}</h2>
        <div className="flex flex-wrap justify-center gap-5">
          {events.map((t, index) => (
            <div key={index}>
              <Timer targTime={new Date(t.date)} eventName={t.eventName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Timelyne: React.FC = () => {
  return (
    <>
      <h1 className="text-center mt-10 font-bold text-5xl">TIMELYNE</h1>
      <h5 className="text-center">Babe, I love you so fucking much</h5>
      {renderSection(sectionOne, "Maddie")}
      {renderSection(sectionTwo, "Upcoming Albums")}
      {renderSection(sectionThree, "Concerts")}
    </>
  );
};

export default Timelyne;
