import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCbkftbL7got12VFxKSlRT6Igk4ZNtsces",
  authDomain: "snapchat-clone-65691.firebaseapp.com",
  projectId: "snapchat-clone-65691",
  storageBucket: "snapchat-clone-65691.appspot.com",
  messagingSenderId: "682970984978",
  appId: "1:682970984978:web:fe2309a8f5107929545ecb",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
