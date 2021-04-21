import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigator/AppNavigator'
import store from './src/redux/store';
import JMessage from "./src/utils/JMessage";

export default class App extends Component {

    async componentDidMount() {
        // await Geo.initGeo();
        console.log('app mount')
        // 极光初始化
        const res = JMessage.init()
            .then((response) => {
                console.log('then 1');
                return response.json()
            })
            .catch((error) => {console.warn("fetch error:", error);console.log('then 2')}).then((response) => {
                console.log('then 3');
                console.log(response)
            });
        console.log("init", res);


        // 极光登录
        const res1 = await JMessage.login('18602368180', '123456');
        console.log('login',res1);
    }

    render() {
        return (
            /**
             * 3. 将store传递给App框架
             */
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        )
    }
}
