import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDCbA2W4TM13mD3d3jC8xg3RpTgYSaw-8Q",
  authDomain: "proiectlicentacuadmin.firebaseapp.com",
  projectId: "proiectlicentacuadmin",
  storageBucket: "proiectlicentacuadmin.appspot.com",
  messagingSenderId: "253444892134",
  appId: "1:253444892134:web:d6ad460e1c9ebd1b526227"
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth= firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db,auth,provider} ;