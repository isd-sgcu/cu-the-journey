import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.SNOWPACK_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.SNOWPACK_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.SNOWPACK_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.SNOWPACK_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.SNOWPACK_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.SNOWPACK_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.SNOWPACK_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// eslint-disable-next-line import/no-mutable-exports
let app: firebase.app.App;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export default app;

//* Sign in as anonymous

app.auth().signInAnonymously();

//* Store time capsule function

const db = app.firestore();
const collection = db.collection("time_capsules");

export async function storeTimeCapsule(uid: string, text: string) {
  const docData = {
    text
  };
  await collection.doc(uid).set(docData);
}
