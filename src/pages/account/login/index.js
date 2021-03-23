import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, CheckBox, Input } from "react-native-elements";
import { Color, Layout, Size } from "../../../utils/GlobalStyle";
import { pxToDp, screenHeight } from "../../../utils/styleKits";

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
  submit = () => {
    this.props.navigation.navigate("Main");
  };

  /**
   * 确认用户协议
   */
  checkAgreement = () => {
    this.setState({
      agreementChecked: !this.state.agreementChecked,
    })};

  /**
   * 获取用户协议
   */
  getUserAgreement = () => {
    // TO DO
    console.log("getUserAgreement");
  };

  render() {
    return (
      <View>
        {/* 1.0 标题栏 开始 */}
        <View style={styles.header}>
          <Text style={styles.headerFont}>登录</Text>
        </View>
        {/* 1.0 标题栏 结束 */}
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
              leftIcon={{ type: "feather", name: "smartphone", color: Color.font.alleviate, size: pxToDp(20) }}
            />
            {/* 2.1.1 手机号输入栏 结束 */}
            {/* 2.1.2 密码输入栏 开始 */}
            <Input
              name="password"
              placeholder="请输入登录密码"
              secureTextEntry={true}
              leftIcon={{ type: "font-awesome-5", name: "key", color: Color.font.alleviate, size: pxToDp(20) }}
              onChangeText={this.saveInputData("password")}
            />
            {/*  2.1.2 密码输入栏 结束 */}
          </View>
          {/* 2.1 输入栏 结束 */}
          {/* 2.2 找回密码 开始*/}
          <Text style={styles.findPassword} onPress={this.toFindPassword}>找回密码</Text>
          {/* 2.2 找回密码 结束*/}
          {/* 2.3 登录按钮 开始 */}
          <Button
            buttonStyle={{ ...styles.button, backgroundColor: this.state.buttonColor }}
            title="确认登录"
            titleStyle={styles.buttonFont}
            disabled={!(this.state.phoneNumber.length != 0 && this.state.password.length > 1 && this.state.agreementChecked)}
            onPress={this.submit}
          />
          {/*  2.3 登录按钮 结束 */}
          {/* 2.4 阅读用户协议 开始 */}
          <View style={styles.tips}>
            {/* TO DO*/}
            <CheckBox
              center
              containerStyle={styles.checkBox}
              activeOpacity={1}
              title="请阅读同意"
              textStyle={styles.tipsFont}
              iconType="material-icons"
              checkedIcon="check-circle"
              checkedColor={Color.font.alleviate}
              uncheckedIcon="radio-button-unchecked"
              onPress={this.checkAgreement}
              checked={this.state.agreementChecked}
            />
            <Text style={styles.tipsFont} onPress={this.getUserAgreement}>《用户协议》</Text>
          </View>
          {/* 2.4 阅读用户协议 结束 */}
        </View>
        {/* 2.0 主体部分 结束 */
        }
      </View>
    );
  }
}

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
    backgroundColor: Color.background.content,
    height: screenHeight - Size.header.height,
  },
  input: {
    marginTop: pxToDp(20),
    backgroundColor: "white",
  },
  button: {
    width: pxToDp(240),
    height: pxToDp(60),
    alignSelf: "center",
    borderRadius: pxToDp(10),
    marginBottom: pxToDp(5),
  },
  buttonFont: {
    fontSize: Size.font.header,
  },
  findPassword: {
    fontWeight: "bold",
    color: Color.font.alleviate,
    alignSelf: "flex-end",
    marginTop: pxToDp(10),
    marginBottom: pxToDp(20),
    marginRight: pxToDp(10),
  },
  tips: {
    flexDirection: "row",
    ...Layout.flex.horizonVerticalCenter,
  },
  checkBox:{
    backgroundColor:"transparent",
    borderWidth:0,
    marginRight: -20,
  },
  tipsFont: {
    fontWeight: "bold",
    color: Color.font.alleviate,
  },
});

export default Index;
