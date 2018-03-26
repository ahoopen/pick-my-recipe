import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Container, Content } from 'native-base'
import Card from '../components/card/card';

import firebase, { database } from '../firebase';
import map from 'lodash/map';

export class HomeTab extends Component {

    state = {
        currentUser: null,
        recipes: null,
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            <Icon name="ios-home" style={{ color: tintColor }} />
        }
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((currentUser) => {
            this.setState({ currentUser });

            database.ref('/recipes').on('value', (snapshot) => {
                this.setState({ recipes: snapshot.val() });
            });
        });
    }

    render() {
        const { recipes, currentUser } = this.state;

        return (
            <Container style={styles.container}>
                <Content>
                    {map(recipes, (recipe, key) => {
                        return <Card
                            key={key}
                            recipeId={key}
                            recipe={recipe}
                            navigation={this.props.navigation}
                        />
                    })}
                </Content>
            </Container>
        )
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
