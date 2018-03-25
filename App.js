import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';

import Login from './components/login/login';

const firebaseConfig = {
  apiKey: "AIzaSyA61FStRRuELGh1k13HjJqZJLlEfuccRLs",
  authDomain: "pick-my-recipe.firebaseapp.com",
  databaseURL: "https://pick-my-recipe.firebaseio.com",
  projectId: "pick-my-recipe",
  storageBucket: "pick-my-recipe.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <Login />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
