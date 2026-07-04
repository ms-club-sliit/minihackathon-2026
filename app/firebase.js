import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FirebaseConfigs } from "./configs";

const FirebaseApp = initializeApp({
	apiKey: FirebaseConfigs.API_KEY,
	authDomain: FirebaseConfigs.AUTH_DOMAIN,
	projectId: FirebaseConfigs.PROJECT_ID,
	storageBucket: FirebaseConfigs.STORAGE_BUCKET,
	messagingSenderId: FirebaseConfigs.MESSAGING_SENDER_ID,
	appId: FirebaseConfigs.APP_ID,
	measurementId: FirebaseConfigs.MEASUREMENT_ID,
},
{
	experimentalAutoDetectLongPolling: true,
	useFetchStreams: false,
});

const Db = getFirestore(FirebaseApp);
const Storage = getStorage(FirebaseApp);
const colPrefix = FirebaseConfigs.FIREBASE_COLLECTION_PREFIX;

export { FirebaseApp, Db, Storage, colPrefix };
