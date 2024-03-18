import { type FirebaseOptions, getApps, getApp, initializeApp } from 'firebase/app';
import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APPID,
	PUBLIC_FIREBASE_AUTHDOMAIN,
	PUBLIC_FIREBASE_PROJECTID,
	PUBLIC_FIREBASE_STORAGEBUCKET,
	PUBLIC_FIREBASE_MESSAGINGSENDERID
} from '$env/static/public';
import { getAuth, type Auth, type User } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTHDOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECTID,
	storageBucket: PUBLIC_FIREBASE_STORAGEBUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGINGSENDERID,
	appId: PUBLIC_FIREBASE_APPID
};

let app;
if (!getApps().length) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApp();
}

export const auth = getAuth(app);

export const initFirebaseAuth = (auth: Auth): Promise<User> => {
	return new Promise((resolve, reject) => {
		var unsubscribe = auth.onAuthStateChanged((user) => {
			if (user !== null) {
				resolve(user);
			} else {
				reject('user is null');
			}
			unsubscribe();
		});
	});
};
