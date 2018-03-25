import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, StatusBar } from 'react-native';

import * as firebase from 'firebase';

export default class LoginForm extends Component {

    state = {
        email: '',
        password: '',
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log(user);
            }
        });
    }

    signUpUser = (email, password) => {
        try {
            if (this.state.password.length < 6) {
                alert('please enter at least 6 characters');
            }

            firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error.toString());
        }
    };

    loginUser = async (email, password) => {
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(user);
        } catch (error) {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <TextInput
                    placeholder="email"
                    placeholderTextColor="rgba(255,255,255, 0.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(email) => this.setState({ email })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255, 0.7)"
                    returnKeyType="go"
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(password) => this.setState({ password })}
                    ref={(input) => this.passwordInput = input}
                />

                <View >
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}
                            onPress={() => this.loginUser(this.state.email, this.state.password)}
                        >Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}
                            onPress={() => this.signUpUser(this.state.email, this.state.password)}
                        >Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({

    container: {
        padding: 20,
    },

    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 10,
        color: '#fff',
        paddingHorizontal: 10,
    },

    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700',
    }
});