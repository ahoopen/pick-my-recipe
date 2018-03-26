import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';
import LoginForm from './../components/login/login-form';

export class LoginScreen extends Component {

    render() {
        const { navigate} = this.props.navigation;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image />
                    <Text>Tekst onder logo</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm navigate={navigate} />
                </View>
            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },

    formContainer: {

    }
});