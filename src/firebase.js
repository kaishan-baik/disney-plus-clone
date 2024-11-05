import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD591YBO8apdJjV7D0f123NZDvrgStfCig',
  authDomain: 'disney-plus-clone-a0405.firebaseapp.com',
  projectId: 'disney-plus-clone-a0405',
  storageBucket: 'disney-plus-clone-a0405.appspot.com',
  messagingSenderId: '847603174420',
  appId: '1:847603174420:web:1c034057bdfaaf7507ab01',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
