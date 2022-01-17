import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCOfZ9dB47Q6Qrsnp8IpvLMFJlHDNP3zyU',
  authDomain: 'apod-d220f.firebaseapp.com',
  databaseURL: '',
  projectId: 'apod-d220f',
  storageBucket: 'apod-d220f.appspot.com',
  messagingSenderId: '336035505649',
  appId: '1:336035505649:web:fcc583f7504de1eeb9d050'
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
export default firestore;
