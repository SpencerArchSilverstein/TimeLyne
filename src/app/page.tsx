"use client";

import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig"; // ✅ Adjust path

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
    date: "2025-09-12T23:59:00-04:00",
    eventName: "Archie to CHO",
    tag: "Maddie",
  },
  {
    date: "2025-09-26T23:59:00-04:00",
    eventName: "Archie to CHO",
    tag: "Maddie",
  },
  {
    date: "2025-10-10T23:59:00-04:00",
    eventName: "Maddie to NYC",
    tag: "Maddie",
  },
  {
    date: "2025-10-30T23:59:00-04:00",
    eventName: "Archie to CHO 🎃",
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

const ALLOWED_EMAILS = ["archsilverstein@gmail.com", "mhyoo1864@gmail.com"];

const sectionOne = dat.filter((item) => item.tag === "Maddie");
const sectionTwo = dat.filter((item) => item.tag === "Album Release");
const sectionThree = dat.filter((item) => item.tag === "Concert");

const renderSection = (events: EventItem[], title: string) => {
  if (events.length === 0) return null;

  return (
    <div className="border-2 border-gray-500 bg-gray-50 m-10 rounded-3xl">
      <div className="flex flex-col items-center gap-10 p-10">
        <h2 className="text-3xl font-semibold text-center">{title}</h2>
        <div className="flex flex-wrap justify-center gap-5">
          {events.map((t, index) => (
            <Timer
              key={index}
              targTime={new Date(t.date)}
              eventName={t.eventName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Timelyne: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u && u.email && ALLOWED_EMAILS.includes(u.email)) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <h1 className="text-center mt-10 font-bold text-5xl">TIMELYNE</h1>

      {!user ? (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleGoogleSignIn}
            className="rounded-xl border p-4 bg-gray-100 font-bold hover:bg-gray-200"
          >
            Sign in with Google
          </button>
        </div>
      ) : !isAllowed ? (
        <div className="text-center mt-10">
          <p className="text-red-500 font-bold">Access Denied</p>
          <button
            onClick={handleSignOut}
            className="mt-4 rounded-xl border p-2 bg-gray-100 hover:bg-gray-200"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          {renderSection(sectionOne, "Maddie")}
          {renderSection(sectionTwo, "Upcoming Albums")}
          {renderSection(sectionThree, "Concerts")}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSignOut}
              className="rounded-xl border p-2 bg-gray-100 hover:bg-gray-200"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Timelyne;
