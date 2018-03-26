import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase, { database } from '../firebase';
import map from 'lodash/map';

export class RecipeTab extends Component {

    state = {
        currentUser: null,
        recipe: null,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((currentUser) => {
            this.setState({ currentUser });

            const { recipeId } = this.props.navigation.state.params;
            console.log(recipeId);

            database.ref(`/recipes/${recipeId}`).on('value', (snapshot) => {
                console.log(snapshot);

                this.setState({ recipe: snapshot.val() });
            });
        });
    }

    render() {
        const { recipe } = this.state;

        return (
            <View style={styles.container}>
                {recipe && (
                    <View>
                        <Text>{recipe.title}</Text>
                        {map(recipe.ingredients, (ingredient) => {
                            return <Text key={ingredient.name}>{ingredient.name}</Text>
                        })}
                    </View>
                )}
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
