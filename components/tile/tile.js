import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

export class Tile extends Component {

    componentWillMount() {
        this.animatedValue = new Animated.Value(1);
    }

    handlePressIn = () => {
        Animated.spring(this.animatedValue, {
            toValue: .9,
            duration: 300,
            easing: Easing.easeOutBack,
            useNativeDriver: true
        }).start();
    };

    handlePressOut = () => {
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true
        }).start();
    };

    render() {
        const animatedStyle = {
            transform: [{
                scale: this.animatedValue
            }]
        };

        return (
            <TouchableWithoutFeedback
                onPressIn={this.handlePressIn}
                onPressOut={this.handlePressOut}
                onPress={() => this.props.onTilePress()}
            >
                <Animated.View
                    style={[{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }, animatedStyle]}
                >
                    {this.props.children}
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}