import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigator/AppNavigator'
import store from './src/redux/store';
import JMessage from "./src/utils/JMessage";

export default class App extends Component {

    componentDidMount(){
        // await Geo.initGeo();
        // 极光初始化
        const res = JMessage.init();
        console.log("init",res);
    }

    render(){
        return(
            /**
             * 3. 将store传递给App框架
             */
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        )
    }
}
