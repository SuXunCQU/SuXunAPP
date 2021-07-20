import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import JoinedTabPage from './joinTab/JoinedTab';
import RecruitTab from './recruitTab/RecruitTab';
import { createStackNavigator } from 'react-navigation-stack';
import ItemDetailPage from '../../components/ItemDetailPage';

const {width, height, scale} = Dimensions.get("window");
const MARGIN_HORIZONTAL = width * 0.2 / 4;
export default class TaskListPage extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const TopTabNavigator = createMaterialTopTabNavigator(
            {
                JoinedTabPage: {
                    screen: JoinedTabPage,
                    navigationOptions:{
                        tabBarLabel: ({tintColor, focused}) => (
                            <Text style={{
                                color: focused ? "#000": "grey",
                                fontSize: 12,
                                alignSelf: "center",
                                fontWeight: focused ? "bold" : "normal",
                            }}>已加入</Text>
                        ),
                    }
                },
                RecruitTab:{
                    screen: RecruitTab,
                    navigationOptions:{
                        tabBarLabel: ({tintColor, focused}) => (
                            <Text style={{
                                color: focused ? "#000": "grey",
                                fontSize: 12,
                                alignSelf: "center",
                                fontWeight: focused ? "bold" : "normal",
                            }}>招募中</Text>
                        ),
                    }
                }

            },{
                initialRouteName: "RecruitTab",
                tabBarOptions:{
                    indicatorStyle: {
                        backgroundColor: "#121212",
                        height: 5,
                        borderRadius: 5,
                        width: "40%",
                        marginHorizontal: MARGIN_HORIZONTAL,
                    },
                    style:{
                        backgroundColor: "#fff",
                    },
                    labelStyle:{
                        color: "#000",
                    }
                }
            }
        )
        const StackNavigator = createAppContainer(createStackNavigator(
            {
                TopTabNavigator: {
                    screen: TopTabNavigator,
                    navigationOptions:{
                        headerShown: false,
                    }
                },
                ItemDetailPage: {
                    screen: ItemDetailPage,
                    navigationOptions: {
                        headerShown: null,
                    }
                }

            }
        ));
        return(
            <View style={styles.container}>
                <StackNavigator />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
})
