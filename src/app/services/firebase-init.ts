import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC3Ye6S8sLiegXQfrmZ5LM_MsIznIdlpnE",
  authDomain: "mphf-71891.firebaseapp.com",
  projectId: "mphf-71891",
  storageBucket: "mphf-71891.appspot.com",
  messagingSenderId: "1082240236500",
  appId: "1:1082240236500:web:44a5a603dc4d8626d0b441",
  measurementId: "G-TQ9F1TLXC1"
};

const app = initializeApp(firebaseConfig);

export { app };