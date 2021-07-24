import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.SNOWPACK_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.SNOWPACK_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.SNOWPACK_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.SNOWPACK_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.SNOWPACK_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.SNOWPACK_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.SNOWPACK_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// eslint-disable-next-line import/no-mutable-exports
let app: firebase.app.App;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
} else {
  app = firebase.app();
}

export default app;

//* Initialize analytics
firebase.analytics();

//* Sign in as anonymous

app.auth().signInAnonymously();

const db = app.firestore();
const collection = db.collection(process.env.SNOWPACK_PUBLIC_TIME_CAPSULE_COLLECTION || "");

type CapsuleDetailType = {
  text: string;
  name: string;
  timestamp?: firebase.firestore.FieldValue;
};

export const uploadTimeCapsule = (studentId: string, email: string, detail: CapsuleDetailType) => {
  collection.doc(studentId).set(
    {
      [email]: firebase.firestore.FieldValue.arrayUnion({
        ...detail,
        timestamp: firebase.firestore.Timestamp.now(),
      }),
    },
    { merge: true },
  );
};
