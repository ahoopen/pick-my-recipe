import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button } from 'native-base';
import { Text } from 'react-native';
import { IngredientForm } from '../components/ingredients/ingredients-form';

import firebase, { database } from '../firebase';

export class AddRecipeScreen extends Component {

    state = {
        currentUser: null
    };

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
            this.setState({ currentUser });

            // database.ref('test').on('value', (snapshot) => {
            //     console.log('data changed', snapshot.val());
            // });
            // const ref = database.ref('recipe');
            // ref.once('value').then((snapshot) => {
            //     console.log(snapshot.recipe);
            //     console.log(snapshot.val());
            // });
        });
    }

    add() {
        const { title, ingredients } = this.state;

        database.ref('/recipes').push({
            title,
            ingredients
        });
    }

    updateIngredients = (ingredients) => {
        this.setState({ ingredients });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <Form>
                        <Item>
                            <Input
                                placeholder="title"
                                onChangeText={(title) => this.setState({ title })}
                            />
                        </Item>
                        <Item>
                            <Input 
                                placeholder="description"
                                onChangeText={(description) => this.setState({ description })}
                             />
                        </Item>
                        <Item>
                            <Input 
                                placeholder="persons"
                                onChangeText={(persons) => this.setState({ persons })}
                             />
                        </Item>
                        <Item>
                            <IngredientForm
                                onIngredientAdded={(ingredients) => {
                                    this.updateIngredients(ingredients)
                                }} />
                        </Item>
                        <Item last>
                            <Button onPress={() => this.add()}><Text>Button</Text></Button>
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}
