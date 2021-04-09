import React, { Component } from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Icon from './Icon';
import GlobalStyle from '../res/style/GlobalStyle';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const {width, height, scale} = Dimensions.get("window");
export default class MessageItem extends Component {
    render() {
        const {item} = this.props;
        return (
            <View style={styles.textCardContainer}>
                <View style={styles.textContainer}>
                    <View style={styles.label}>
                        <Icon iconName="person" labelName={item.name}/>
                    </View>
                    <Text style={styles.description} numberOfLines={3} ellipsizeMode={"tail"}>详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情</Text>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    textCardContainer:{
        height: 60,
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
    textContainer:{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    title:{
        fontWeight: "bold",
        marginRight: 5,
    },
    label:{
        flexDirection: "row",
        alignItems: "center",
    },
    description:{
        width: "88%",
        fontSize: 13,
        marginHorizontal: 10,
        color: "#555",
    },
})
