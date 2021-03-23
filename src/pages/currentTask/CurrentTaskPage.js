import React from 'react';
import GlobalStyle from '../../res/style/GlobalStyle';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../../redux/action';
import CluePage from './tabs/CluePage';
import CurrentTaskHomePage from './CurrentTaskHomePage';
import NewCluePage from './tabs/NewCluePage';
import OrderPage from "./tabs/OrderPage";
import MainDetailPage from '../../components/ItemDetailPage';
import ChatPage from './tabs/message/chat';

class CurrentTaskPage extends React.Component{
    render(){
        const StackNavigator = createAppContainer(createStackNavigator(
            {
                CurrentTaskHomePage: {
                    screen: CurrentTaskHomePage,
                    navigationOptions:{
                        title: "当前任务",
                        headerStyle: GlobalStyle.headerStyle,
                        headerTitleStyle: GlobalStyle.headerTitleStyle,
                    }
                },
                CluePage: {
                    screen: CluePage,
                    navigationOptions:{
                        headerShown: false,
                    }
                },
                NewCluePage:{
                    screen: NewCluePage,
                    navigationOptions:{
                        headerShown: false,
                    }
                },
                OrderPage:{
                    screen: OrderPage,
                    navigationOptions:{
                        headerShown: false,
                    }
                },
                MainDetailPage:{
                    screen: MainDetailPage,
                    navigationOptions:{
                        headerShown: false,
                    }
                },
                MessagePage:{
                    screen:ChatPage,
                    navigationOptions:{
                        headerShown: false,
                    }
                }

            }
        ));
        return <StackNavigator/>
    }
};

const mapDispatchToProps = (dispatch) => ({
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme))
});

export default connect(null, mapDispatchToProps)(CurrentTaskPage);
