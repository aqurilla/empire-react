import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCIkDjV5I87NvDn4mX3m7owgNvGTpqmi08',
  authDomain: 'empire-react.firebaseapp.com',
  databaseURL: 'https://empire-react.firebaseio.com',
  projectId: 'empire-react',
  storageBucket: 'empire-react.appspot.com',
  messagingSenderId: '379746159654',
  appId: '1:379746159654:web:6325d513e4761aef5ceae7',
  measurementId: 'G-CWX79RVMQQ'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log('Error creating user', err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
