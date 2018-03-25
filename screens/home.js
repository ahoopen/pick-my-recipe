import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base'


export class HomeTab extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            <Icon name="ios-home" style={{ color: tintColor }} />
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>home tab</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
