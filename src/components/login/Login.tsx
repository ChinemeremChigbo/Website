import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

// const { data } = await axios
//   .post<{accessToken: string}>(`${apiBaseURL}/token`, requestParams);

// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOAMIN,
// };
// firebase.initializeApp(config);

// // ...
// const history = useHistory()
// const signInWithGoogle = async () => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   const { credential } = firebase.auth().signInWithPopup(provider);

//   if (credential) {
//     try {
//       const requestParams = {
//         provider: 'google',
//         accessToken: credential.accessToken,
//       };
//       const { data } = await axios
//         .post<{accessToken: string}>(`${apiBaseURL}/token`, requestParams);
      
//       sessionStorage.setItem('accessToken', data.accessToken);
//       history.push('/url-to-redirect');
//     } catch (e) {
//       // Error hanlding logic
//     }
//   }
// }
export{}