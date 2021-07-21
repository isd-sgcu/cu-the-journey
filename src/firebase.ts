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
} else {
  app = firebase.app();
}

export default app;

//* Sign in as anonymous

app.auth().signInAnonymously();

const db = app.firestore();
const collection = db.collection(process.env.SNOWPACK_PUBLIC_TIME_CAPSULE_COLLECTION || "");

//* Store time capsule function

async function storeTimeCapsule(uid: string, texts: string[], emails: string[]) {
  const docData = {
    emails,
    texts
  };
  await collection.doc(uid).set(docData);
}

//* Get time capsule function.

export async function manageTimeCapsule(uid: string, newText: string, newEmail: string) {
  collection
    .doc(uid)
    .get()
    .then(doc => {
      if (doc.exists) {
        const { texts: textArr, emails: emailArr } = doc.data();
        storeTimeCapsule(uid, [...textArr, newText], [...emailArr, newEmail]);
      } else {
        storeTimeCapsule(uid, [newText], [newEmail]);
      }
    })
    .catch(e => {
      console.log(e);
    });
}
