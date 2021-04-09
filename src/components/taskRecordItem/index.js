import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {pxToDp} from "../../utils/styleKits";
import {Icon} from "react-native-elements";
import {Size} from "../../utils/GlobalStyle";

const {width, height, scale} = Dimensions.get("window");
export default class TaskRecordItem extends Component {
    render() {
        const {item} = this.props;
        return (
            <View style={styles.textCardContainer}>
                <View style={styles.textContainer}>
                    {/*<View style={styles.label}>*/}
                    {/*    <Icon iconName="person" labelName={item.name}/>*/}
                    {/*</View>*/}
                    <View style={styles.title}>
                        <Text style={styles.name}>{item.taskName}</Text>
                        <Icon type='antdesign' name='ellipsis1' size={15} color='#121212' />
                    </View>
                    <Text style={styles.description} ellipsizeMode={"tail"}>启动时间：{item.startTime}</Text>
                    <Text style={styles.description} ellipsizeMode={"tail"}>结束时间：{item.endTime}</Text>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    textCardContainer: {
        height: pxToDp(100),
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
    textContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 3,
        paddingTop: 23,
    },
    label: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 7,
    },
    name: {
        width: "88%",
        fontSize: 15,
        color: "#555",
        fontWeight: 'bold',
        marginBottom: pxToDp(3),
    },
    description: {
        marginTop: pxToDp(3),
        width: "88%",
        fontSize: 13,
        color: "#555",
    },
})
