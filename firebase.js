import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA61FStRRuELGh1k13HjJqZJLlEfuccRLs",
    authDomain: "pick-my-recipe.firebaseapp.com",
    databaseURL: "https://pick-my-recipe.firebaseio.com",
    projectId: "pick-my-recipe",
    storageBucket: "pick-my-recipe.appspot.com"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase;

  export const database = firebase.database();