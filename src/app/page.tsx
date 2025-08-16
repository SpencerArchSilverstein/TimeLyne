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
    eventName: "Maddie to NYC (Labor Day Weekend)",
    tag: "Maddie",
  },
  {
    date: "2025-09-12T10:40:00-04:00",
    eventName: "Archie to CHO",
    tag: "Maddie",
  },
  {
    date: "2025-09-26T10:40:00-04:00",
    eventName: "Archie to CHO",
    tag: "Maddie",
  },
  {
    date: "2025-10-10T15:20:00-04:00",
    eventName: "Maddie's Fall Break to NYC",
    tag: "Maddie",
  },
  {
    date: "2025-10-29T19:34:00-04:00",
    eventName: "Archie to CHO 🎃",
    tag: "Maddie",
  },
  {
    date: "2025-11-14T15:20:00-04:00",
    eventName: "Maddie to NYC",
    tag: "Maddie",
  },
  {
    date: "2025-11-20T19:34:00-04:00",
    eventName: "Archie to CHO",
    tag: "Maddie",
  },
  {
    date: "2025-12-18T16:00:00-04:00",
    eventName: "Maddie to NYC",
    tag: "Maddie",
  },
  {
    date: "2025-11-28T23:59:59-04:00",
    eventName: "Joey Bada$$: Lonely At The Top",
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

function EmojiRain() {
  useEffect(() => {
    function createEmoji() {
      const emoji = document.createElement("div");
      emoji.textContent = "💋";
      emoji.className =
        "fixed top-[-2rem] text-3xl pointer-events-none select-none animate-fall";
      emoji.style.left = Math.random() * 100 + "vw";
      emoji.style.animationDuration = Math.random() * 3 + 2 + "s";
      document.body.appendChild(emoji);

      setTimeout(() => emoji.remove(), 5000);
    }

    const interval = setInterval(createEmoji, 300);
    return () => clearInterval(interval);
  }, []);

  return null;
}

const targetDate = new Date(dat[0].date).getTime(); // ms
const now = Date.now(); // ms
const daysLeft = Math.floor((targetDate - now) / (1000 * 60 * 60 * 24));

const ALLOWED_EMAILS = ["archsilverstein@gmail.com", "mhyoo1864@gmail.com"];
const MADDIE_COMPLIMENTS = [
  "I could get lost in those brown eyes for hours",
  "C'MEEEEERRR!",
  "One time for the fans! FOR THE FANS! WOOOOO!",
  "Infinite smooches, INFINITE!",
  "Babe, I love you so fucking much 😍😘🥰",
  "Shall I compare that ass to a summer's day? No I shant, summer days are for 3 months, I can grab that ass YEAR ROUND!",
  "Your hair is gorgeous,and I love those curls of yours",
  "honk honk",
  "I want to give you a back massage",
  "I love being a golden retriever couple",
  "I luuuuuuuv youuuuuuuu",
  "You're utterly perfect",
  "I'll take you to the golden retriever farm in NJ",
  "sooo 🧃-y 🤤",
  "This is a sign to DM me on instagram 😈",
  "I'm all yours babe, every  last  inch",
  "🤤&🙇🏼🫵🏻🍑",
  "🥰🍆💦👉🏻🍑",
  "🫸🏻🍒🤤🍒🫷🏻",
  "🧖🏼🐶🧖🏻‍♀️",
  "😘💪🏻",
  "8===✊🏼=D💦🧖🏻‍♀️",
  "Redeem a screenshot of this message for 3 ab pics",
  "Redeem a screenshot of this message for 3 bicep pics",
  `ONLY ${daysLeft} DAY${daysLeft === 1 ? "" : "S"} LEFT!`,
  "I'm craving some whipped cream...",
  "I miss you so much babe",
  "You make me so happy babe",
  "You're stunning",
];
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
  const [complimentIndex, setComplimentIndex] = useState(0);
  useEffect(() => {
    setComplimentIndex(Math.floor(Math.random() * MADDIE_COMPLIMENTS.length));
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
      {MADDIE_COMPLIMENTS[complimentIndex] ==
        "Infinite smooches, INFINITE!" && <EmojiRain />}

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
      ) : user.email == "mhyoo1864@gmail.com" ? (
        <>
          <h5 className="text-center text-xl mt-3 mx-20">
            {new Date().getHours() < 8
              ? "Oh sleepy Maddie...Oh sleepy Maddie 😘😴"
              : MADDIE_COMPLIMENTS[complimentIndex]}
          </h5>
          {renderSection(sectionOne, "Maddie")}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSignOut}
              className="rounded-xl border p-2 bg-gray-100 hover:bg-gray-200"
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <>
          <h5 className="text-center text-xl mt-3">
            I love you so much babe 😍😘🥰
          </h5>
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
