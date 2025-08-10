"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "../../firebaseConfig"; // ✅ Make sure this path matches your setup
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        router.push("/timelyne"); // ✅ Redirect to your main app page
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-5xl font-bold mb-10">TIMELYNE</h1>
      <button
        onClick={handleGoogleSignIn}
        className="rounded-xl border p-4 bg-gray-100 font-bold hover:bg-gray-200"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
