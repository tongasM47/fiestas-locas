// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA7bPdZSkIvu1nSr3CREjeWQztou5Ty-9s",
    authDomain: "fiestaslocas-a0cea.firebaseapp.com",
    projectId: "fiestaslocas-a0cea",
    storageBucket: "fiestaslocas-a0cea.appspot.com",
    messagingSenderId: "306666027509",
    appId: "1:306666027509:web:b256088eaca5b2dd6c48bc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
