import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAlPN1_nXHHhQVTkPdW4e-njEPdvJKy03Q',
	authDomain: 'unichat-f3f63.firebaseapp.com',
	projectId: 'unichat-f3f63',
	storageBucket: 'unichat-f3f63.appspot.com',
	messagingSenderId: '1005609374289',
	appId: '1:1005609374289:web:9423caac73332069a9de70'
};

export const auth = firebase.initializeApp(firebaseConfig).auth();
// we are exporting auth created by our firebase app that includes all our API keys project id.
