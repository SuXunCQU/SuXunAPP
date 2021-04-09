import React, { Component } from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import avatar from '../res/images/avatar.jpeg';
import NavigationUtil from "../utils/NavigationUtil";

const {width, height, scale} = Dimensions.get("window");
export default class MessageItem extends Component {
    render() {
        const {item} = this.props;
        return (
            <Card style={styles.cardContainer}>
                <CardTitle
                    avatarSource={avatar}
                    title={item.member_id}
                    subtitle={item.post_time}
                />
                <CardContent text={item.text} />
                <View style={styles.imagesContainer}>
                    <TouchableOpacity style={styles.imageContainer}>
                        <CardImage
                            style={styles.cardImage}
                            source={{uri: item.photo}}
                            resizeMode={"cover"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.imageContainer}
                    >
                        <CardImage
                            style={styles.cardImage}
                            source={{uri: "https://dimg05.c-ctrip.com/images/100u1f000001gq8o837C4_R_1600_10000.jpg"}}
                            resizeMode={"cover"}
                        />
                    </TouchableOpacity>
                </View>
            </Card>
        )
    }
};

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: "#fefefe",
        borderWidth: 1 / scale,
        borderColor: "#e8e8e8",
        borderRadius: 10,
        margin: 10,
        marginBottom: 0,
        // ios的阴影
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        // android的阴影
        elevation: 5,
    },
    imagesContainer:{
        height: 180,
        flexDirection: "row",
        paddingHorizontal: 5,
    },
    imageContainer:{
        flex: 1,
    },
    cardImage:{
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#fefefe",
    },

    // textContainer:{
    //     flexDirection: "row",
    //     justifyContent: "flex-start",
    //     alignItems: "center",
    //     paddingHorizontal: 10,
    //     paddingTop: 5,
    // },
    // title:{
    //     fontWeight: "bold",
    //     marginRight: 5,
    // },
    // label:{
    //     flexDirection: "row",
    //     alignItems: "center",
    // },
    // description:{
    //     width: "88%",
    //     fontSize: 13,
    //     marginHorizontal: 10,
    //     color: "#555",
    // },
})
