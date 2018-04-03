import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Platform,
    TouchableWithoutFeedback,
    Animated,
    ScrollView,
    Dimensions
} from 'react-native';
import { Icon, Container, Content } from 'native-base'
import * as Animatable from 'react-native-animatable'
import Card from '../components/card/card';

import { Tile } from '../components/tile/tile';

// detail screen
import { Detail } from './detail';

import firebase, { database } from '../firebase';
import map from 'lodash/map';

import { systemWeights } from 'react-native-typography'

const { height } = Dimensions.get('window');

export class HomeTab extends Component {

    state = {
        currentUser: null,
        recipes: null,

        recipe: null,
        openProgress: new Animated.Value(0)
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

    onItemPress = () => {
        console.log('item press', height);

        // this.state.openProgress.interpolate({
        //     inputRange: [0.005, 0.01],
        //     outputRange: [1, 0]
        // });

        this.setState({
            recipe: 1,
            isAnimating: true
        }, () => {
            Animated.timing(this.state.openProgress, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start(() => {
                console.log('done animating..');
            });
        });
    }

    closeDetail = () => {
        this.setState({
            recipe: null,
            isAnimating: false
        }, () => {
            Animated.timing(this.state.openProgress, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start(() => {
                console.log('done animating..');
            });
        });
    }

    render() {
        const { recipes, currentUser } = this.state;

        return (
            <ScrollView style={styles.container}>
                <View
                    style={{
                        flex: 2,
                        marginTop: Platform.OS === 'ios' ? 34 : 0
                    }}
                >
                    <Animatable.View
                        animation="fadeInUp"
                        style={{ marginBottom: 20 }}
                    >
                        <Text style={styles.header}>Recipes</Text>
                        <FlatList
                            style={{ margin: 10 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={map(recipes, (recipe, key) => {
                                return {
                                    key,
                                    recipe
                                };
                            })}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item, index }) => {
                                return (
                                    <Tile
                                        onTilePress={this.onItemPress}
                                    >
                                        <View
                                            style={styles.card}
                                        >
                                            <Card
                                                recipe={item.recipe}
                                                recipeId={item.key}
                                                navigation={this.props.navigation}
                                            />

                                        </View>
                                    </Tile>
                                );
                            }}
                        />
                    </Animatable.View>
                </View>

                {/* <View
                    style={{
                        flex: 2,
                        backgroundColor: '#ffffff'
                    }}>

                    <Text
                        style={{
                            marginLeft: 20,
                            paddingTop: 40,
                            paddingBottom: 40,
                            fontSize: 34,
                            ...systemWeights.bold,
                        }}
                    >Your Favorites</Text>

                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={styles.card}
                            >


                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>

                </View> */}



                <View
                    style={{
                        backgroundColor: 'yellow',
                        height: 500,
                    }}
                >
                </View>

                <Detail
                    recipe={this.state.recipe}
                    onClose={this.closeDetail}
                    isAnimating={this.isAnimating}
                    openProgress={this.state.openProgress}
                />


            </ScrollView>
        )
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },

    header: {
        marginLeft: 20,
        fontSize: 34,
        ...systemWeights.bold,
    },

    card: {
        width: 200,
        height: 175,
        borderRadius: 16,
        margin: 10,

        shadowRadius: 2,
        // shadowOffset: {
        //     width: 6,
        //     height: 6
        // },
        backgroundColor: '#fff',
        shadowColor: 'rgba(0,0,0, .07)',
        shadowOpacity: .7,
    }
});