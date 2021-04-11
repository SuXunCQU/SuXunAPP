import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Color, Layout, Size } from "../../../utils/GlobalStyle";
import { Input } from "react-native-elements";
import ViewUtil from "../../../utils/ViewUtil";
import NavigationUtil from "../../../utils/NavigationUtil";
import NavigationBar from "../../../components/NavigationBar";

class Index extends Component {

  user = {
    "avatar": "",
    "name": "",
  };

  onBack() {
    NavigationUtil.goBack(this.props.navigation);
  }

  render() {
    const info = this.props.navigation.state.params;
    let navigationBar = <NavigationBar
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      title={"修改" + info.value}
      style={styles.header}
    />;
    console.log(this.props);
    return (
      <View>
        {/*  1.0 标题栏 开始 */}
        {/*<Header*/}
        {/*  statusBarProps={{ translucent: false }}*/}
        {/*  containerStyle={styles.header}*/}
        {/*  centerComponent={{ text: "修改" + info.value, style: styles.headerFont }}*/}
        {/*  leftComponent={ViewUtil.getLeftBackButton(()=>this.onBack())}*/}
        {/*/>*/}
        {navigationBar}
        {/* 1.0 标题栏 结束 */}
        {/*  2.0 内容 开始 */}
        <View>
          <Input />
        </View>
        {/* 2.0 内容 结束 */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    // ...Layout.flex.horizonVerticalCenter,
    borderWidth: Size.borderWidth,
    borderColor: Color.border,
    ...Size.header,
    backgroundColor: "white",
    height: 50,
  },
});

export default Index;
