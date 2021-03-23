import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import JoinedTabPage from './joinTab/JoinedTab';
import RecruitTab from './recruitTab/RecruitTab';
import { createStackNavigator } from 'react-navigation-stack';
import GlobalStyle from '../../res/style/GlobalStyle';
import ItemDetailPage from '../../components/ItemDetailPage';


export default class TaskListPage extends React.Component{

    render(){
        const TopTabNavigator = createMaterialTopTabNavigator(
            {
                JoinedTabPage: {
                    screen: JoinedTabPage,
                    navigationOptions:{
                        title: "已加入"
                    }
                },
                RecruitTab:{
                    screen: RecruitTab,
                    navigationOptions:{
                        title: "招募中"
                    }
                }

            },{
                tabBarOptions:{
                    indicatorStyle: {
                        backgroundColor: "pink"
                    }
                }
            }
        )
        const StackNavigator = createAppContainer(createStackNavigator(
            {
                TopTabNavigator: {
                    screen: TopTabNavigator,
                    navigationOptions:{
                        title: "任务列表",
                        headerStyle: GlobalStyle.headerStyle,
                        headerTitleStyle: GlobalStyle.headerTitleStyle,
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
        flex: 1
    },
})
