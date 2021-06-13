import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyAZFBBOo_E6Pi2eQr5jwjnJnrLQh84r77g",
  authDomain: "booksanta-ee5cd.firebaseapp.com",
  projectId: "booksanta-ee5cd",
  databaseURL: "https://booksanta-ee5cd.firebaseio.com",
  storageBucket: "booksanta-ee5cd.appspot.com",
  messagingSenderId: "672798865535",
  appId: "1:672798865535:web:761c9caab76bcfed31674a"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

