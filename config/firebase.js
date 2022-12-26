import serviceAccount from './serviceAccountKey.json' assert { type: "json" };
import admin from 'firebase-admin';
import { getFirestore } from "firebase-admin/firestore";

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


export default firebaseApp;
export const auth = admin.auth();
export const db = getFirestore(firebaseApp);

