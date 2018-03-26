import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';

import { RecipeTab } from './recipe';
import { HomeTab } from './home';
import { LoginScreen } from './login';
import { AddRecipeScreen } from './addRecipe';

export class MainScreen extends Component {

    static navigationOptions = {
        title: 'Pick my recipe'
    };

    render() {
        return (
            <AppTabNavigator />
        )
    }
}

const AppTabNavigator = TabNavigator({

    Home: {
        screen: HomeTab,
    },

    Login: {
        screen: LoginScreen,
    },

    Recipe: {
        screen: RecipeTab
    },

    AddRecipe: {
        screen: AddRecipeScreen
    }
    
}, {
    animationEnabled: true,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
        style: {
            ...Platform.select({
                android: {
                    backgroundColor: 'white'
                }
            })
        },
        activeTintColor: '#000',
        inactiveTintColor: '#d1cece',
        showIcon: true
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});