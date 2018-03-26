import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button } from 'native-base';

export class IngredientForm extends Component {

    state = {
        name: '',
        ingredients: [{ name: '' }],
    };

    handleIngredientNameChange = (idx) => (text) => {
        const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
            if (idx !== sidx) return ingredient;
            return { ...ingredient, name: text };
        });

        this.setState({ ingredients: newIngredients }, () => {
            this.props.onIngredientAdded(this.state.ingredients);
        });
    }

    handleSubmit = (evt) => {
        const { name, ingredients } = this.state;
        alert(`Incorporated: ${name} with ${ingredients.length} shareholders`);
    }

    handleAddIngredient = () => {
        this.setState({
            ingredients: [
                ...this.state.ingredients,
                { name: '' }
            ]
        });
    }

    handleRemoveIngredient = (idx) => () => {
        this.setState({
            ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
        });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding">
                <Text>ingredient</Text>

                {this.state.ingredients.map((ingredient, idx) => (
                    <View key={idx} className="shareholder">
                        <TextInput
                            key={idx}
                            placeholder={`Ingredient name`}
                            value={ingredient.name}
                            onChangeText={this.handleIngredientNameChange(idx)}
                        />
                        <Button onPress={this.handleRemoveIngredient(idx)}><Text>-</Text></Button>
                    </View>
                ))}
                <Button onPress={this.handleAddIngredient}><Text>Add Ingredient</Text></Button>
                <Button onPress={this.handleSubmit}><Text>Incorporate</Text></Button>
            </KeyboardAvoidingView>
        )
    }
}