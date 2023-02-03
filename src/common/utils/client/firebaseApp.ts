import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCtQkIEjQhcXSma6CvZiBB-ciud8blnkNk",
  authDomain: "event-kita-cefc5.firebaseapp.com",
  projectId: "event-kita-cefc5",
  storageBucket: "event-kita-cefc5.appspot.com",
  messagingSenderId: "845076695891",
  appId: "1:845076695891:web:590ef1eed6f2914240afa6"
};

export const firebaseApp = initializeApp(firebaseConfig);