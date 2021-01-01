import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
  apiKey: 'YOUR FIREBASE API KEY HERE',
  authDomain: 'mapapp-5f44d.firebaseapp.com',
  databaseURL: 'https://mapapp-5f44d.firebaseio.com',
  projectId: 'mapapp-5f44d',
  storageBucket: 'mapapp-5f44d.appspot.com',
  messagingSenderId: '952774467397',
  appId: '1:952774467397:ios:872131e16874c892fe282c',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };