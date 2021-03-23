import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../utils/NavigationUtil';


export default class HomePage extends React.Component{
    render(){
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator />
    }
};
