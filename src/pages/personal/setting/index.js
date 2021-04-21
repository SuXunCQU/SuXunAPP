import React, {Component} from "react";
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon, Input} from "react-native-elements";
import {Color, Size} from "../../../utils/GlobalStyle";
import {pxToDp, screenHeight} from "../../../utils/styleKits";
import ViewUtil from "../../../utils/ViewUtil";
import NavigationUtil from "../../../utils/NavigationUtil";
import NavigationBar from "../../../components/NavigationBar";
import LinearGradient from "react-native-linear-gradient";
import {Overlay} from "teaset";

// import {PickerView} from "@ant-design/react-native";


class Index extends Component {

    selectAvatar = () => {
        console.log('selectAvatar');
    }

    inputName = () => {
        console.log('inputName');
        let overlayView = (
            <Overlay.PullView side='bottom' modal={false}>
                <View style={styles.bottomModal}>
                    <View style={styles.edit}>
                        <Text style={styles.editTitle}>修改姓名</Text>
                        <Input placeholder='请输入真实姓名'/>
                        <Button title='确定' style={styles.confirm} color={Color.background.content}
                                onPress={this.update('name', '测试')}/>
                    </View>
                </View>
            </Overlay.PullView>
        )
        Overlay.show(overlayView);
    }

    selectGender = () => {
        console.log('selectGender');
        let genderScope = ['女', '男']
        let gender = 1;
        let overlayView = (
            <Overlay.PullView side='bottom' modal={false}>
                <View style={styles.bottomModal}>
                    <View style={styles.edit}>
                        <Text style={styles.editTitle}>修改性别</Text>
                        <Input placeholder='请输入真实性别'/>
                        <Button title='确定' style={styles.confirm} color={Color.background.content}
                                onPress={this.update('name', '测试')}/>
                    </View>
                </View>
            </Overlay.PullView>
        )
        Overlay.show(overlayView);
    }

    selectAge = () => {
        console.log('selectAge');
        let ageScope = Array.from({length: 150}, (value, index) => index);
        console.log(ageScope);
        let overlayView = (
            <Overlay.PullView side='bottom' modal={false}>
                <View style={styles.bottomModal}>
                    <View style={styles.edit}>
                        <Text style={styles.editTitle}>修改年龄</Text>
                        <Input placeholder='请输入真实年龄'/>
                        <Button title='确定' style={styles.confirm} color={Color.background.content}
                                onPress={this.update('name', '测试')}/>
                    </View>
                </View>
            </Overlay.PullView>
        )
        Overlay.show(overlayView);
    }

    selectLocation = () => {
        console.log('selectLocation');
        let overlayView = (
            <Overlay.PullView side='bottom' modal={false}>
                <View style={styles.bottomModal}>
                    <View style={styles.edit}>
                        <Text style={styles.editTitle}>修改住址</Text>
                        <Input placeholder='请输入常住址'/>
                        <Button title='确定' style={styles.confirm} color={Color.background.content}
                                onPress={this.update('name', '测试')}/>
                    </View>
                </View>
            </Overlay.PullView>
        )
        Overlay.show(overlayView);
    }

    inputPhone = () => {
        console.log('inputPhone');
        let overlayView = (
            <Overlay.PullView side='bottom' modal={false}>
                <View style={styles.bottomModal}>
                    <View style={styles.edit}>
                        <Text style={styles.editTitle}>修改联系电话</Text>
                        <Input placeholder='请输入有效联系电话'/>
                        <Button title='确定' style={styles.confirm} color={Color.background.content}
                                onPress={this.update('name', '测试')}/>
                    </View>
                </View>
            </Overlay.PullView>
        )
        Overlay.show(overlayView);
    }

    inputWeChat = () => {
        console.log('inputWeChat');
        let overlayView = (
            <Overlay.PullView side='bottom' modal={false}>
                <View style={styles.bottomModal}>
                    <View style={styles.edit}>
                        <Text style={styles.editTitle}>修改微信</Text>
                        <Input placeholder='请输入微信号/手机号'/>
                        <Button title='确定' style={styles.confirm} color={Color.background.content}
                                onPress={this.update('name', '测试')}/>
                    </View>
                </View>
            </Overlay.PullView>
        )
        Overlay.show(overlayView);
    }

    logout = () => {
        console.log('logout');
    }

    update = (type, value) => {
        console.log('type', type, 'value', value);
    }

    state = {
        // 设置功能列表
        settingList: [
            {
                key: "avatar",
                value: "头像",
                onPress: this.selectAvatar,
                icon: {
                    type: 'fontawesome',
                    name: 'image'
                }
            },
            {
                key: "name",
                value: "姓名",
                onPress: this.inputName,
                icon: {
                    type: 'feather',
                    name: 'edit-3'
                }
            },
            {
                key: "gender",
                value: "性别",
                onPress: this.selectGender,
                icon: {
                    type: 'fontisto',
                    name: 'transgender'
                }
            },
            {
                key: "age",
                value: "年龄",
                onPress: this.selectAge,
                icon: {
                    type: 'entypo',
                    name: 'select-arrows'
                }
            },
            {
                key: "location",
                value: "住址",
                onPress: this.selectLocation,
                icon: {
                    type: 'feather',
                    name: 'map-pin'
                }
            },
            {
                key: "phone",
                value: "电话",
                onPress: this.inputPhone,
                icon: {
                    type: 'feather',
                    name: 'phone'
                }
            },
            {
                key: "WeChat",
                value: "微信",
                onPress: this.inputWeChat,
                icon: {
                    type: 'antdesign',
                    name: 'wechat'
                }
            },
            {
                key: 'logout',
                value: '退出登录',
                onPress: this.logout,
                icon: {
                    type: 'simplelineIcons',
                    name: 'logout'
                }
            }
        ],
    };


    /**
     * 跳转到修改界面
     */
    showUpdate = (item) => {
        return () => {
            console.log(item);
            this.props.navigation.navigate("UpdatePage", item);
        };
    };

    onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    render() {
        const {settingList} = this.state;
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            // title={'设置'}
            style={styles.header}
            titleView={<Text style={styles.headerFont}>设置</Text>}
        />
        return (
            <View>
                {/*  1.0 标题栏 开始 */}
                {navigationBar}
                {/* 1.0 标题栏 结束*/}
                {/* 2.0 设置列表 开始*/}
                <LinearGradient colors={['#009394', Color.background.content, Color.background.start]}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 1}}
                                style={styles.background}>
                    <View style={{height: pxToDp(18)}}></View>
                    {
                        settingList.map((item) => (
                            <TouchableOpacity onPress={item.onPress} style={styles.settingList} key={item.key}
                                              activeOpacity={0.8}>
                                <View style={{flexDirection: 'row'}}>
                                    <Icon type={item.icon.type} name={item.icon.name} size={20}
                                          color='#121212'/>
                                    <Text style={{fontSize: Size.font.normal}}>&nbsp;&nbsp;{item.value}</Text>
                                </View>
                                <View style={styles.rightIcon}>
                                    {item.key === "avatar" ?
                                        <Image
                                            style={Size.icon}
                                            source={{uri:'http://img.fdchen.host/suxun/member/avatar.jpg'}}
                                        /> : <></>}
                                    <Icon name="chevron-right" type="FontAwesome5"/>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </LinearGradient>
                {/* 2.0 设置列表 结束 */}
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        header: {
            backgroundColor: "white",
        }
        ,
        headerFont: {
            color: Color.font.header,
            fontSize: Size.font.header,
        }
        ,
        background: {
            width: '100%',
            height: screenHeight - Size.header.height,
            paddingLeft: pxToDp(10),
            paddingRight: pxToDp(10),
        }
        ,
        settingList: {
            // borderBottomWidth: Size.borderWidth,
            // borderColor: '#121212',
            marginBottom: pxToDp(5),
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            alignItems: "center",
            paddingLeft: pxToDp(20),
            paddingRight: pxToDp(10),
            height: pxToDp(50),
            borderRadius: pxToDp(5),
            elevation: 10,
        },
        rightIcon: {
            flexDirection: "row",
            alignItems: "center",
        },
        bottomModal: {
            backgroundColor: '#fff',
            minWidth: 300,
            minHeight: 200,
            justifyContent: 'center',
            alignItems: 'center'
        },
        edit: {
            width: '100%',
            paddingLeft: 10,
            paddingTop: 15,
            paddingBottom: 10,
        },
        editTitle: {
            fontWeight: 'bold',
            fontSize: Size.font.header,
            paddingLeft: 12,
        },
        confirm: {
            width: 100,
            height: 80,
            backgroundColor: Color.background.content,
            marginTop: 5,
        },
        picker: {
            width: '100%',
            height: 40,
            paddingLeft: 15,
            borderWidth: 1,
            borderColor: Color.border,
            marginTop: 10,
        },
    });

export default Index;
