import React from "react";
import Timer from "./Timer";

type EventItem = {
  date: string;
  eventName: string;
  tag: string;
};

const dat: EventItem[] = [
  {
    date: "2025-07-02T08:30:00",
    eventName: "Maddie NYC July Trip",
    tag: "Maddie",
  },
  {
    date: "2025-07-30T21:00:00",
    eventName: "Maddie NYC August Trip",
    tag: "Maddie",
  },
  {
    date: "2025-08-07T23:59:59",
    eventName: "JID: God Does Like Ugly",
    tag: "Music",
  },
  {
    date: "2025-07-10T23:59:59",
    eventName: "Clipse: Let God Sort Em Out",
    tag: "Music",
  },
  {
    date: "2025-08-07T23:59:59",
    eventName: "Amaarae: Black Star",
    tag: "Music",
  },

  {
    date: "2025-08-28T23:59:59",
    eventName: "Sabrina Carpenter: Man's Best Friend",
    tag: "Music",
  },
];

// Split into two sections
const targetTag = "Maddie ❤️🍑🤤";

const sectionOne = dat.filter((item) => item.tag === targetTag);
const sectionTwo = dat.filter((item) => item.tag !== targetTag);

const renderSection = (events: EventItem[], title: string) => {
  const grouped = events.reduce((acc, item) => {
    if (!acc[item.tag]) acc[item.tag] = [];
    acc[item.tag].push(item);
    return acc;
  }, {} as Record<string, EventItem[]>);

  return (
    <div className="border-2 border-gray-500 bg-gray-50 m-10 rounded-3xl">
      <div className="flex flex-col gap-10 p-10">
        {Object.entries(grouped).map(([tag, group]) => (
          <div key={tag}>
            <h3 className="text-center font-bold text-4xl">{tag}</h3>
            <div className="flex flex-row flex-wrap justify-center gap-5 mt-4">
              {group.map((t, i) => (
                <div key={i}>
                  <Timer targTime={new Date(t.date)} eventName={t.eventName} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Timelyne: React.FC = () => {
  return (
    <>
      <h1 className="text-center mt-10 font-bold text-5xl">TIMELYNE</h1>
      {renderSection(sectionOne, "Maddie Section")}
      {renderSection(sectionTwo, "Other Events")}
    </>
  );
};

export default Timelyne;
