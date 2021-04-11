import React, { Component } from 'react'
import { View, ViewPropTypes, StyleSheet, Text, Platform, DeviceInfo, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import Button from "teaset/components/Button/Button";

const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;
const STATUS_BAR_HEIGHT = (Platform.OS !== 'ios' || DeviceInfo.isIPhoneX_deprecated) ? 0 : 20;//状态栏的高度
const StatusBarShape = { // 设置状态栏所接受的属性
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
}
export const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;
export default class NavigationBar extends Component {
    // 提供属性的类型检查
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
    };

    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        },
    }

    render() {
        let statusBar = this.props.statusBar.hidden ? null :
            <View style={styles.navBar}>
                <StatusBar {...this.props.statusBar} />
            </View>

        let titleView = this.props.titleView ? this.props.titleView :
            <Text numberOfLines={1} style={styles.title}>{this.props.title}</Text>

        let content = this.props.hide ? null :
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>

        return (
            <View style={[styles.container, this.props.style]}>
                {/* {statusBar} */}
                {content}
            </View>
        )
    }

    getButtonElement(button) {
        return (
            <View style={styles.navBarButton}>
                {button ? button : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    navBarButton: {
        flexDirection: "row",
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: NAV_BAR_HEIGHT,
        paddingRight: 5,
    },
    navBarTitleContainer: {
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        color: '#000',
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT,
    },
});
