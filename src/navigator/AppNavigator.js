import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomePage from "../pages/HomePage";
import LoginPage from '../pages/account/login'
import WelcomePage from "../pages/WelcomePage";
import FetchDemoPage from '../pages/demo/FetchDemoPage';
import AsyncStorageDemoPage from '../pages/demo/AsyncStorageDemoPage';
import DataStoreDemoPage from '../pages/demo/DataStoreDemoPage';

const InitNavigator = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions:{
                headerShown: false, // 隐藏头部
            }
        },
    }
);

const LoginNavigator = createStackNavigator(
    {
        LoginPage:{
            screen: LoginPage,
            navigationOptions:{
                headerShown:false,
            }
        }
    }
)

const MainNavigator = createStackNavigator(
    {
        HomePage:{
            screen: HomePage,
            navigationOptions:{
                headerShown: false, // 隐藏头部
            }
        },
        FetchDemoPage:{
            screen: FetchDemoPage,
        },
        AsyncStorageDemoPage:{
            screen: AsyncStorageDemoPage,
        },
        DataStoreDemoPage:{
            screen: DataStoreDemoPage,
        }
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        // Init: LoginNavigator,
        Main: MainNavigator,
    },
    {
        navigationOptions:{
            header: null
        }
    }
))
