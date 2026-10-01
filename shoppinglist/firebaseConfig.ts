// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_-WREpS0tGCJ7iSE24sNjtypMYFskut0",
  authDomain: "shoppinglist-f718a.firebaseapp.com",
  databaseURL: "https://shoppinglist-f718a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppinglist-f718a",
  storageBucket: "shoppinglist-f718a.firebasestorage.app",
  messagingSenderId: "901664490813",
  appId: "1:901664490813:web:ad928356361e68c24d7154"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);