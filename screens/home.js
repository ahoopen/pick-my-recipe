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
import { Icon, Container, Content } from 'native-base';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import Card from '../components/card/card';

import { Tile } from '../components/tile/tile';

// detail screen
import { Detail } from './detail';
import { Transition } from './transition';

import firebase, { database } from '../firebase';
import map from 'lodash/map';

import { iOSUIKit, iOSColors, systemWeights } from 'react-native-typography'

const { height, width } = Dimensions.get('window');

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
        this.setState({
            recipe: 1,
            isAnimating: true,
        }, () => {
            Animated.timing(this.state.openProgress, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start(() => {
                this.setState({ isAnimating: false });
            });
        });
    }

    closeDetail = () => {
        this.setState({
            recipe: null,
            isAnimating: true
        }, () => {
            Animated.timing(this.state.openProgress, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start(() => {
                this.setState({ isAnimating: false });
            });
        });
    }

    render() {
        const { recipes, currentUser } = this.state;

        return (
            <ScrollView contentContainerStyle={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch"
            }} style={styles.container}>
                <Animated.View
                    style={{
                        flex: 2,
                        marginTop: Platform.OS === 'ios' ? 34 : 0,
                        opacity: this.state.openProgress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0]
                        })
                    }}
                >
                    <Animatable.View
                        animation="fadeInUp"
                        // style={{
                        //     paddingBottom: 20
                        // }}
                    >
                        <Text style={styles.header}>Recipes</Text>
                        <FlatList
                            style={{padding: 20 }}
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
                                        <Card
                                            recipe={item.recipe}
                                            recipeId={item.key}
                                            navigation={this.props.navigation}
                                        />
                                    </Tile>
                                );
                            }}
                        />
                    </Animatable.View>

                    <View style={styles.recentlyPlayed}>
                        <Text
                            style={{
                                marginLeft: 20,
                                // paddingTop: 40,
                                paddingBottom: 40,
                                fontSize: 34,
                                ...systemWeights.bold,
                            }}
                        >Your Favorites</Text>
                    </View>

                </Animated.View>

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
        // backgroundColor: '#F2F2F2',
    },

    header: {
        marginLeft: 20,
        fontSize: 34,
        ...systemWeights.bold,
    },

    recentlyPlayed: {
        flex: 2,
        height: 500,
        paddingTop: 16,
        backgroundColor: iOSColors.white
    },

    // card: {
    //     // width: width - 100,
    //     // height: 220,
    //     // borderRadius: 14,
    //     // margin: 10,

    //     // shadowRadius: 10,
    //     // shadowOffset: {
    //     //     width: 0,
    //     //     height: 0
    //     // },
    //     // backgroundColor: '#fff',
    //     // shadowColor: 'rgba(0,0,0, .15)',
    //     // shadowOpacity: .9,
    // }
});