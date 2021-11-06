
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARIzWI3NCZzhs9qb9-ITxCCyACeQFjK3M",
  authDomain: "atcoffee-adea8.firebaseapp.com",
  databaseURL: "https://atcoffee-adea8-default-rtdb.firebaseio.com",
  projectId: "atcoffee-adea8",
  storageBucket: "atcoffee-adea8.appspot.com",
  messagingSenderId: "683061952642",
  appId: "1:683061952642:web:46c3bb76937a6681e4f49b",
  measurementId: "G-28QK1CBN74"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;
