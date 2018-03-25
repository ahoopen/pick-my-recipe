import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class RecipeTab extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Recipe tab</Text>
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
