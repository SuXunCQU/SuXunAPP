import React from 'react';
import { View, Text, StyleSheet, TextInput, AsyncStorage, ScrollView } from 'react-native';
import DataStore from '../../expand/dao/DataStore';

const KEY = "sava_key";
export default class DataStoreDemoPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showText: ''
        }
        this.dataStore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetchData(url)
            .then((data) => {
                let showData = `初次数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText: showData
                });
            })
            .catch((error) => {
                error && console.log(error.toString());
            });
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>离线缓存</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        this.value = text;
                    }}
                />
                <Text onPress={() => {
                        this.loadData();
                    }}>
                        获取
                </Text>
                <Text>{this.state.showText}</Text>
            </View>
        )
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome:{
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    input:{
        width: "80%",
        height: 40,
        borderColor: "#000",
        borderWidth: 1,
        marginRight: 10
    },
    input_container:{
        width: "90%",
        height: 50,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start"
    },
    show_container:{
        flex: 1,
        borderWidth: 1,
        borderColor: "#000"
    }
});
