import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import NavigationUtil from "../../../utils/NavigationUtil";

export default class RecruitTab extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>RecruitTab</Text>
                <Button title="跳转到Fetch" onPress={()=>{
                    NavigationUtil.goPage({
                        navigation: this.props.navigation
                    }, "FetchDemoPage")
                }} />
                <Button title="跳转到AsyncStorage" onPress={()=>{
                    NavigationUtil.goPage({
                        navigation: this.props.navigation
                    }, "AsyncStorageDemoPage")
                }} />
                <Button title="离线缓存框架" onPress={()=>{
                    NavigationUtil.goPage({
                        navigation: this.props.navigation
                    }, "DataStoreDemoPage")
                }} />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome:{
        fontSize: 20,
        textAlign: "center",
        margin: 10,

    }
})
