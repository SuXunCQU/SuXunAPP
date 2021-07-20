import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";
import {Button, CheckBox, Icon, Input} from "react-native-elements";
import {Color, Layout, Size} from "../../../utils/GlobalStyle";
import {pxToDp, screenHeight} from "../../../utils/styleKits";
import Toast from "../../../utils/Toast";
import actions from "../../../redux/action";
import {connect} from "react-redux";
import {reqLogin} from "../../../api";

class Index extends Component {

    state = {
        phoneNumber: "",
        password: "",
        buttonColor: Color.background.loginHeader,
        agreementChecked: false,

    };

    /**
     * 存储输入框数据
     */
    saveInputData = (dataType) => {
        // console.log(dataType,"dataType");
        return (event) => {
            // console.log(event,"event");
            this.setState({
                [dataType]: event,
            });
            // console.log(this.state);
        };
    };

    /**
     * 找回密码
     */
    toFindPassword = () => {
        // TO DO
        console.log("toFindPassword");
    };

    /**
     * 提交数据
     */
    submit = async () => {
        // 登录
        const username = '123456789';
        const password = '123456';
        const res = await reqLogin(username, password);
        // const res = {
        //     status: 0,
        //     token: 111
        // }
        console.log(res);
        if (res.status === 0) {
            this.props.setUsername(username);
            this.props.setToken(res.token);
            this.props.setMemberId(res.member_id);
            this.props.setMemberPhoto(res.member_photo);
            this.props.navigation.navigate("Main");
        } else {
            Toast.showTips("账号或密码不正确");
        }
        console.log('submit');
    };


    /**
     * 确认用户协议
     */
    checkAgreement = () => {
        this.setState({
            agreementChecked: !this.state.agreementChecked,
        })
    };

    /**
     * 获取用户协议
     */
    getUserAgreement = () => {
        // TO DO
        console.log("getUserAgreement");
    };

    render() {
        console.log(this.props);
        const token = this.props.token;
        if(token){
            this.props.navigation.navigate("Main");
        }
        return (
            <View>
                {/* 0.0  状态栏 开始 */}
                <StatusBar backgroundColor="transparent" translucent={true}/>
                {/* 0.0  状态栏 结束 */}
                {/* 1.0 背景图片 开始 */}
                {/* 200 单位 dp 单位px -> dp单位? */}
                <Image style={{width: "100%", height: pxToDp(220), backgroundColor: '#fff'}}
                       source={require("../../../res/images/loginBackground.png")}/>
                {/* 1.0 背景图片 结束*/}
                {/* 2.0 主体部分 开始 */}
                <View style={styles.content}>
                    {/* 2.1 输入栏 开始 */}
                    <View style={styles.input}>
                        {/* 2.1.1 手机号输入栏 开始 */}
                        <Input
                            name="phoneNumber"
                            placeholder="请输入手机号码"
                            maxLength={11}
                            keyboardType="phone-pad"
                            onChangeText={this.saveInputData("phoneNumber")}
                            leftIcon={{
                                type: "feather",
                                name: "smartphone",
                                color: Color.font.alleviate,
                                size: pxToDp(20)
                            }}
                        />
                        {/* 2.1.1 手机号输入栏 结束 */}
                        {/* 2.1.2 密码输入栏 开始 */}
                        <Input
                            name="password"
                            placeholder="请输入登录密码"
                            secureTextEntry={true}
                            leftIcon={{
                                type: "font-awesome-5",
                                name: "key",
                                color: Color.font.alleviate,
                                size: pxToDp(20)
                            }}
                            onChangeText={this.saveInputData("password")}
                        />
                        {/*  2.1.2 密码输入栏 结束 */}
                    </View>
                    {/* 2.1 输入栏 结束 */}
                    {/* 2.2 登录按钮 开始 */}
                    <View style={styles.login}>
                        <Text style={styles.loginText}>登录</Text>
                        <Button
                            buttonStyle={styles.button}
                            icon={
                                <Icon
                                    type='antdesign'
                                    name="arrowright"
                                    size={40}
                                    color='white'
                                />
                            }
                            onPress={this.submit}
                            // disabled={!(this.state.phoneNumber.length != 0 && this.state.password.length > 1 && this.state.agreementChecked)}
                        />
                    </View>
                    {/*  2.2 登录按钮 结束 */}
                    <View style={styles.addition}>
                        {/* 2.3 阅读用户协议 开始 */}
                        <View style={styles.tips}>
                            {/* TO DO*/}
                            <CheckBox
                                center
                                containerStyle={styles.checkBox}
                                activeOpacity={1}
                                title="请阅读同意"
                                textStyle={{color: Color.font.alleviate}}
                                iconType="material-icons"
                                checkedIcon="check-circle"
                                checkedColor={Color.font.alleviate}
                                uncheckedIcon="radio-button-unchecked"
                                onPress={this.checkAgreement}
                                checked={this.state.agreementChecked}
                            />
                            <View>
                                <Text style={styles.tipsFont}
                                      onPress={this.getUserAgreement}>《用户协议》</Text>
                            </View>

                        </View>
                        {/* 2.3 阅读用户协议 结束 */}
                        {/* 2.4 找回密码 开始*/}
                        <View style={styles.findPassword}>
                            <Text style={styles.tipsFont} onPress={this.toFindPassword}>找回密码</Text>
                        </View>

                        {/* 2.4 找回密码 结束*/}
                    </View>
                </View>
                {/* 2.0 主体部分 结束 */
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    username: state.username,
    password: state.password,
    token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
    setUsername: (username) => dispatch(actions.setUsername(username)),
    setToken: (token) => dispatch(actions.setToken(token)),
    setMemberId: (member_id) => dispatch(actions.setMemberId(member_id)),
    setMemberPhoto: (member_photo) => dispatch(actions.setMemberPhoto(member_photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);

const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.background.loginHeader,
        ...Size.header,
        ...Layout.flex.horizonVerticalCenter,
    },
    headerFont: {
        color: "white",
        fontSize: Size.font.header,
    },
    content: {
        paddingTop: pxToDp(30),
        paddingLeft: pxToDp(20),
        paddingRight: pxToDp(20),
        backgroundColor: "#fff",
        height: screenHeight - Size.header.height,
    },
    input: {
        marginTop: pxToDp(20),
        backgroundColor: "white",
    },
    login: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: pxToDp(30),
    },
    loginText: {
        paddingLeft: pxToDp(20),
        marginLeft: pxToDp(5),
        fontSize: pxToDp(35),
    },
    button: {
        width: pxToDp(60),
        height: pxToDp(60),
        alignSelf: "center",
        borderRadius: pxToDp(30),
        marginBottom: pxToDp(5),
        backgroundColor: Color.background.start,
    },
    buttonFont: {
        fontSize: Size.font.header,
    },
    addition: {
        marginTop: pxToDp(40),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tips: {
        flexDirection: "row",
        alignItems: 'center',
    },
    checkBox: {
        borderWidth: 0,
        backgroundColor: "transparent",
        marginRight: -20,
    },

    tipsFont: {
        fontWeight: "bold",
        color: Color.font.alleviate,
        textDecorationLine: 'underline',
    },
    findPassword: {
        fontWeight: "bold",
        color: Color.font.alleviate,
        textDecorationLine: 'underline',
        paddingRight: pxToDp(10),
    },
});
