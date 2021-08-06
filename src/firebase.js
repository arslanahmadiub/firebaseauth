import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDAq1XAyrb3vMdz0swiuYCjrD-6LRwW-5I",
  authDomain: "vibes-demo-85632.firebaseapp.com",
  projectId: "vibes-demo-85632",
  storageBucket: "vibes-demo-85632.appspot.com",
  messagingSenderId: "571494009113",
  appId: "1:571494009113:web:faa910b0b4f9697d631d88",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
