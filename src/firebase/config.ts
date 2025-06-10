import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDAnpQoDWZXBxW8knEoJFXBdNXyfoMtxtA",
  authDomain: "couple-expense-app.firebaseapp.com",
  databaseURL: "https://couple-expense-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "couple-expense-app",
  storageBucket: "couple-expense-app.firebasestorage.app",
  messagingSenderId: "390810695720",
  appId: "1:390810695720:web:c53d41ecc87118047a9d1d"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app); 