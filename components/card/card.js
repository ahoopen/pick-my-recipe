import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Animated, TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button } from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';

export default class CardComponent extends Component {

    render() {
        const { title } = this.props.recipe;
        const { recipeId } = this.props;
        const { navigate } = this.props.navigation;

        console.log(recipeId);

        return (
            <View
                paddingBottom={20}
                style={{
                    overflow: 'hidden'
                }}
            >
                <TouchableOpacity
                    // onPress={() => navigate('Recipe', {
                    //     recipeId
                    // })}
                >
                    {/* <Animated.Image
                        source={{
                            uri: 'https://farm5.staticflickr.com/4374/36390435575_7e51b26c00_z.jpg',
                            cache: 'force-cache'
                        }}
                        style={{
                            height: 150
                        }}
                    /> */}
                    <Text>Dit is een recept</Text>
                    {/* <Left>
                        <Text>{title}</Text>
                    </Left>
                    <Body>
                        <Text>test</Text>
                        <Icon name="ios-people" size={30} />

                        <Text note>Ma 24, 2018</Text>
                    </Body> */}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        shadowRadius: 4,
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowColor: 'rgba(0,0,0, .15)',
        shadowOpacity: 1,

        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,.04)',
        backgroundColor: '#ffffff',

        height: 200,
        width: 200,
    },
});