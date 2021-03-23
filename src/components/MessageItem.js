import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from './Icon';
import GlobalStyle from '../res/style/GlobalStyle';

export default class MessageItem extends Component {
    render() {
        const {item} = this.props;
        return (
            <View style={styles.itemContainer}>
                <Icon iconName="person" labelName={item.clue_name}/>
                <Text>{item.clue_detail}</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    itemContainer:{
        width: "100%",
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingRight: 10,
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: GlobalStyle.itemBaseColor,
        marginVertical: 5,
        // ios的阴影
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        // android的阴影
        elevation: 5,
    },
})
