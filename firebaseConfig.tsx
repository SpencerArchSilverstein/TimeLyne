// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCwk1voUhvMTp6Nf122DLytoMkMEfgQp_M",
  authDomain: "time-lyne.firebaseapp.com",
  projectId: "time-lyne",
  storageBucket: "time-lyne.firebasestorage.app",
  messagingSenderId: "254973236037",
  appId: "1:254973236037:web:527d6b24dc49f540a9a42c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
