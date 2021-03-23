import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import GlobalStyle from '../../res/style/GlobalStyle';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Profile from './profile'
import { connect } from 'react-redux';
import actions from '../../redux/action';

class UserCenterPage extends React.Component{
    render(){
        const StackNavigator = createAppContainer(createStackNavigator(
            {
                Content: {
                    screen: Profile,
                    navigationOptions:{
                        headerShown: false,
                    }
                }
            }
        ));
        return <StackNavigator />
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
});

const mapDispatchToProps = (dispatch) => ({
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme))
});
export default connect(null, mapDispatchToProps)(UserCenterPage);
