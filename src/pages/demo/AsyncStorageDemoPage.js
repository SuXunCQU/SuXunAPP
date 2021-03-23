import React from 'react';
import { View, Text, StyleSheet, TextInput, AsyncStorage, ScrollView } from 'react-native';

const KEY = "sava_key";
export default class AsyncStorageDemo extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>AsyncStorageDemo</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={text => {
                        this.value = text;
                    }}
                />
                <View style={styles.input_container}>
                    <Text onPress={() => {
                        this.doSave();
                    }}>
                        存储
                    </Text>
                    <Text onPress={() => {
                        this.doRemove();
                    }}>
                        删除
                    </Text>
                    <Text onPress={() => {
                        this.getData();
                    }}>
                        获取
                    </Text>
                </View>
                <Text>{this.state && this.state.showText}</Text>
            </View>
        )
    }

    async doSave(){
        AsyncStorage.setItem(KEY, this.value)
            .catch((error) => {
                error && console.log(error.toString());
            });
    }

    async doRemove(){
        AsyncStorage.removeItem(KEY)
            .catch((error) => {
                error && console.log(error.toString());
            });
    }

    async getData(){
        AsyncStorage.getItem(KEY)
            .then((value) => {
                this.setState({
                    showText: value
                });
                console.log(value);
            })
            .catch((error) => {
                error && console.log(error.toString());
            });
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