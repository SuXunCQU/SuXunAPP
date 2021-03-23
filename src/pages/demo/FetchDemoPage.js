import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';


export default class FetchDemoPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showText: ''
        }
    }

    loadData(){
        // https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response => response.text())
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
            .catch(e => {
                console.log(e.toString());
            })
    }

    loadData2(){
        // https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response => {
                if(response.ok){
                    return response.text();
                }
                throw new Error("Network response was not ok");
            })
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
            .catch(e => {
                this.setState({
                    showText: e.toString()
                })
            })
    }

    render(){
        const {navigation} = this.props;
        const Content = () => (
            <View style={styles.container}>
                <Text style={styles.welcome}>Fetch的使用</Text>
                <View style={styles.input_container}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={text => {
                            this.searchKey = text;
                        }}
                    />
                    <Button 
                        title={"查找"}
                        onPress={() => this.loadData2()}
                    />
                </View>
                <ScrollView style={styles.show_container}>
                    <Text>{this.state.showText}</Text>
                </ScrollView>
            </View>
        )
        const StackNavigator = createAppContainer(createStackNavigator(
            {
                Content: {
                    screen: Content,
                    navigationOptions:{
                        headerShown: false,
                    }
                }
            }
        ));

        return <StackNavigator/>
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
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    show_container:{
        flex: 1,
        borderWidth: 1,
        borderColor: "#000"
    }
});