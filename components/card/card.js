import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions, Image, Text, Animated, TouchableOpacity } from 'react-native';

import { human, iOSColors } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');


export default class CardComponent extends Component {

    render() {
        const { title } = this.props.recipe;
        const { recipeId } = this.props;
        const { navigate } = this.props.navigation;

        console.log(recipeId);

        // onPress={() => navigate('Recipe', {
        //     recipeId
        // })}

        return (
            <View
                style={styles.card}
            >
                <View style={{
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    overflow: 'hidden',
                }}>
                    <Image
                        source={{
                            uri: 'https://farm5.staticflickr.com/4374/36390435575_7e51b26c00_z.jpg',
                            cache: 'force-cache'
                        }}
                        style={[{
                            height: 150,
                            resizeMode: "cover"
                        }]}
                    />
                </View>
                <View style={{ padding: 12, }}>
                    <Text style={styles.album}>Time of Mirrors</Text>
                    <Text style={styles.author}>Chaotic Hook</Text>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({

    card: {
        width: width - 100,
        height: 220,
        marginTop: 24,
        marginHorizontal: 16,
        backgroundColor: iOSColors.white,
        borderRadius: 14,
        ...Platform.select({
            android: { elevation: 16 },
            ios: {
                shadowColor: "black",
                shadowOffset: {
                    width: 0,
                    height: 16
                },
                shadowOpacity: 0.2,
                shadowRadius: 16
            }
        })
    },

    album: {
        ...human.footnoteObject,
        fontSize: 16,
        marginTop: 5
    },

    author: {
        ...human.footnoteObject,
        fontSize: 16,
        color: iOSColors.gray
    },
});