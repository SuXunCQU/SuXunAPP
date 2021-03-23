import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import NavigationUtil from '../utils/NavigationUtil';


// 这个组件是给登录界面占位的
export default class WelcomePage extends React.Component{
    componentDidMount(){
        this.timer = setTimeout(() => {
            // 跳转到首页
            NavigationUtil.resetToHomePage(this.props);
        }, 2000);
    }

    componentWillUnmount(){
        // 页面销毁时，清空计时器
        this.timer && clearTimeout(this.timer);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>WelcomePage</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
