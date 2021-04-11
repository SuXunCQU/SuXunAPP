// 这个js文件展示如何动态生成底部导航器，有需要再用

import React from 'react';
import TaskListPage from '../pages/taskList/TaskListPage';
import CurrentTaskPage from '../pages/currentTask/CurrentTaskPage';
import UserCenterPage from '../pages/personal/UserCenterPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import {BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {Dimensions, LogBox, Text} from 'react-native';
import {connect} from 'react-redux';
import {createStackNavigator} from "react-navigation-stack";
import ProfilePage from "../pages/personal/profile";
import SettingPage from "../pages/personal/setting";

const {width, height, scale} = Dimensions.get("window");

const ProfileNavigator = createStackNavigator(
    {
        ProfilePage: {
            screen: ProfilePage,
            navigationOptions: {
                headerShown: false,
            }
        },
        SettingPage: {
            screen: SettingPage,
            navigationOptions: {
                headerShown: false,
            }
        },
    }
)

const TABS = { // 在这里配置页面的路由
    TaskListPage: {
        screen: TaskListPage,
        navigationOptions: {
            tabBarLabel: ({tintColor, focused}) => (
                <Text style={{color: focused ? tintColor : "grey", fontSize: 12, alignSelf: "center"}}>任务列表</Text>
            ),
            tabBarIcon: ({tintColor, focused}) => (
                <Entypo
                    name={'add-to-list'}
                    size={26}
                    style={{color: focused ? tintColor : "grey"}}
                />
            ),
        }
    },
    CurrentTaskPage: {
        screen: CurrentTaskPage,
        navigationOptions: {
            tabBarLabel: ({tintColor, focused}) => (
                <Text style={{color: focused ? tintColor : "grey", fontSize: 12, alignSelf: "center"}}>当前任务</Text>
            ),
            tabBarIcon: ({tintColor, focused}) => (
                <Entypo
                    name={'location'}
                    size={26}
                    style={{color: focused ? tintColor : "grey"}}
                />
            )
        }
    },
    UserCenterPage: {
        screen: ProfileNavigator,
        navigationOptions: {
            tabBarLabel: ({tintColor, focused}) => (
                <Text style={{color: focused ? tintColor : "grey", fontSize: 12, alignSelf: "center"}}>个人中心</Text>
            ),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? "person" : "person-outline"}
                    size={26}
                    style={{color: focused ? tintColor : "grey"}}
                />
            )
        }
    }
};



class DynamicTabNavigator extends React.Component {
    constructor(props) {
        super(props);
        LogBox.ignoreAllLogs();
    }

    _tabNavigator() {
        // 性能优化，避免频繁创建导航器，因为用redux改变状态后会触发render函数，就会造成组件重新渲染的情况（如突然跳回首页之类的）
        if (this.Tabs) {
            return this.Tabs;
        }
        // 这里模拟服务器下发TABS
        const {TaskListPage, CurrentTaskPage, UserCenterPage} = TABS;
        const tabs = {TaskListPage, CurrentTaskPage, UserCenterPage};
        TaskListPage.navigationOptions.tabBarLabel = "任务列表"; // 动态修改Tab属性
        return this.Tabs = createAppContainer(createBottomTabNavigator(
            tabs,
            {
                tabBarComponent: (props) => {
                    return <TabBarComponent {...props} theme={this.props.theme}/>
                },
                initialRouteName: "CurrentTaskPage",
            }
        ));
    }

    render() {
        const TabNavigator = this._tabNavigator();
        return <TabNavigator/>
    }
}

class TabBarComponent extends React.Component {
    render() {
        return (<BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme}
            style={{
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderLeftWidth: 1 / scale,
                borderRightWidth: 1 / scale,
                borderColor: "#555",
                backgroundColor: "#fefefe",
                position: "absolute",
            }}
        />)
    }
}

// redux 里的 state 到页面中 props 的转换
const mapStateToProps = (state) => ({
    theme: state.theme.color,
});
export default connect(mapStateToProps)(DynamicTabNavigator);
