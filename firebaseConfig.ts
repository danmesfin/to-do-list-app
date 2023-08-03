// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBdTvqw94azfs_SUet_w82QfTGMG1Jr-fA",
  authDomain: "to-do-teraki.firebaseapp.com",
  projectId: "to-do-teraki",
  storageBucket: "to-do-teraki.appspot.com",
  messagingSenderId: "500561189625",
  appId: "1:500561189625:web:17a414916b6892d68f2028"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
