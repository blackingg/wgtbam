import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

// const {
//   FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_DB_URL,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
//   FIREBASE_MESSAGING_SENDER_ID,
//   FIREBASE_APP_ID,
//   FIREBASE_MEASUREMENT_ID
// } = process.env;


export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// export const firebaseConfig = {
//   apiKey: "AIzaSyA4IY7d8HIwukY6-Jzr3jIS1NgdoAnHMXo",
//   authDomain: "owgtbam.firebaseapp.com",
//   databaseURL: "https://owgtbam-default-rtdb.firebaseio.com",
//   projectId: "owgtbam",
//   storageBucket: "owgtbam.appspot.com",
//   messagingSenderId: "413837655468",
//   appId: "1:413837655468:web:e9545c63fcac0e9462ce09",
//   measurementId: "G-V3MKQ2K1ZF"
// };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// const analytics = getAnalytics(app);

export { database, app };