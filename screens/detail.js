import React, { Component } from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const maxWidth = Dimensions.get('window').width;

export class Detail extends Component {

    state = {
        recipe: null
    };

    componentWillReceiveProps(nextProps) {
        const { recipe } = nextProps;

        if (recipe) {
            this.setState({ recipe });
        }
    }

    render() {
        const { recipe } = this.state;
        const { openProgress, isAnimating } = this.props;

        console.log('recipe...', recipe);

        
        if (recipe) {
            return (
                <Animated.View
                    style={[StyleSheet.absoluteFill]}
                    pointerEvents={isAnimating || this.props.recipe ? 'auto' : 'none'}
                        >
                        <Animated.Image
                            ref={r => (this._openingImageRef = r)}
                            source={{
                                uri: 'https://farm5.staticflickr.com/4374/36390435575_7e51b26c00_z.jpg',
                                cache: 'force-cache'
                            }}
                            style={{
                                width: maxWidth,
                                height: 300,
                                opacity: openProgress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]
                                })
                            }}
                        />
                        <Animated.View
                            style={[
                                styles.body,
                                {
                                    opacity: openProgress,
                                    backgroundColor: '#fff',
                                    transform: [{
                                        translateY: openProgress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [100, 0]
                                        })
                                    }]
                                }
                            ]}
                        >
                            <Text>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                      industry. Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book. It has
                      survived not only five centuries, but also the leap into
                      electronic typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset sheets
                      containing Lorem Ipsum passages, and more recently with desktop
                      publishing software like Aldus PageMaker including versions of
                      Lorem Ipsum.
                        </Text>
                        </Animated.View>
                        <Animated.View
                            style={{
                                position: 'absolute',
                                top: 20,
                                left: 20,
                                opacity: this.state.openProgress
                            }}
                            pointerEvents={isAnimating ? 'none' : 'auto'}
                        >
                            <TouchableOpacity
                                onPress={() => this.props.onClose()}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </Animated.View>
                </Animated.View>
                    )
                }
        
        return <View />;
                }
            }
            
const styles = StyleSheet.create({
                        body: {
                        flex: 1,
                    padding: 15,
                    backgroundColor: '#F2F2F2',
                    zIndex: 100
                },
            
    closeText: {color: 'white', backgroundColor: 'transparent' },
                
    closeButton: {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    borderWidth: 1,
                    borderColor: 'white',
                    padding: 10,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: 'white',
                    borderRadius: 5
                }
            
});