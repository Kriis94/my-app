import firebase from 'firebase/app';
import 'firebase/storage';

  var config = {
    apiKey: "AIzaSyBwKg1H1XwsTKbmJgqgAMcbz4Ew83vX5Lk",
    authDomain: "gallery-2b707.firebaseapp.com",
    databaseURL: "https://gallery-2b707.firebaseio.com",
    projectId: "gallery-2b707",
    storageBucket: "gallery-2b707.appspot.com",
    messagingSenderId: "315338443407"
  };

  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }
