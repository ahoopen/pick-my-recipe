import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';

export default class CardComponent extends Component {



    render() {
        const { title } = this.props.recipe;
        const { recipeId } = this.props;
        const { navigate } = this.props.navigation;

        console.log(recipeId, navigate);

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Text onPress={() => navigate('Recipe', {
                recipeId
            }) }>{title}</Text>
                    </Left>
                    <Body>
                        <Text>test</Text>
                        <Text note>Ma 24, 2018</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Text>fdsfs</Text>
                        </Button>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
    },
});