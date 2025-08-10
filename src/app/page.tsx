"use client";

import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/router";
type EventItem = {
  date: string;
  eventName: string;
  tag: string;
};

const dat: EventItem[] = [
  {
    date: "2025-08-29T14:57:00-04:00",
    eventName: "Maddie to NYC",
    tag: "Maddie",
  },
  {
    date: "2025-08-29T14:57:00-04:00",
    eventName: "Maddie to NYC",
    tag: "Maddie",
  },
  {
    date: "2025-09-12T14:57:00-04:00",
    eventName: "Maddie to NYC",
    tag: "Maddie",
  },
  {
    date: "2025-08-29T14:57:00-04:00",
    eventName: "Maddie to NYC",
    tag: "Maddie",
  },
  {
    date: "2025-08-29T14:57:00-04:00",
    eventName: "Maddie to NYC",
    tag: "Maddie",
  },
  {
    date: "2025-08-14T23:59:59-04:00",
    eventName: "Joey Valence & Brae: Hyperyouth",
    tag: "Album Release",
  },
  {
    date: "2025-08-14T23:59:59-04:00",
    eventName: "Chance the Rapper: Star Line",
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
    date: "2025-09-22T19:00:00-04:00",
    eventName: "Freddie Gibbs & Alchemist Concert",
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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect if no user
        router.push("/login"); // 👈 Replace with your login route
      } else {
        setUser(user);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  const handleGoogleSignIn = async (e: any) => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  return (
    <>
      <h1 className="text-center mt-10 font-bold text-5xl">TIMELYNE</h1>
      <button
        onClick={handleGoogleSignIn}
        className="rounded-xl outline-2 p-4 bg-gray-100 font-bold mx-auto"
      >
        LOGIN
      </button>
      <button onClick={() => console.log(auth)}>A</button>
      {auth && (
        <>
          {renderSection(sectionOne, "Maddie")}
          {renderSection(sectionTwo, "Upcoming Albums")}
          {renderSection(sectionThree, "Concerts")}
        </>
      )}
    </>
  );
};

export default Timelyne;
