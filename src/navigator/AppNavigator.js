import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from "../pages/HomePage";
import LoginPage from '../pages/account/login'
import WelcomePage from "../pages/WelcomePage";
import FetchDemoPage from '../pages/demo/FetchDemoPage';
import AsyncStorageDemoPage from '../pages/demo/AsyncStorageDemoPage';
import DataStoreDemoPage from '../pages/demo/DataStoreDemoPage';
import ChatPage from '../pages/currentTask/tabs/message/chat';
import ProfilePage from '../pages/personal/profile'
import SettingPage from "../pages/personal/setting";
import MainDetailPage from "../components/ItemDetailPage";

const InitNavigator = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                headerShown: false, // 隐藏头部
            }
        },
    }
);

const LoginNavigator = createStackNavigator(
    {
        LoginPage: {
            screen: LoginPage,
            navigationOptions: {
                headerShown: false,
            }
        }
    }
)

const ChatNavigator = createStackNavigator(
    {
        ChatPage: {
            screen: ChatPage,
            navigationOptions: {
                headerShown: false,
            }
        }
    }
)

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

const MainNavigator = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                headerShown: false, // 隐藏头部
            }
        },
        FetchDemoPage: {
            screen: FetchDemoPage,
        },
        AsyncStorageDemoPage: {
            screen: AsyncStorageDemoPage,
        },
        DataStoreDemoPage: {
            screen: DataStoreDemoPage,
        }
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        // Init: ChatNavigator,
        Init: MainNavigator,
        Main: ChatNavigator,
    },
    {
        navigationOptions: {
            header: null
        }
    }
))
