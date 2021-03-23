import React, { Component } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import NavigationBar from "../../../components/NavigationBar";
import NavigationUtil from "../../../utils/NavigationUtil";
import ViewUtil from '../../../utils/ViewUtil';
import GlobalStyle from "../../../res/style/GlobalStyle";

export default class NewCluePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "", // 只有edit
    };
  }

  render() {
    const {mode} = this.state;
    const EditButton = () => {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text>{this.state.mode === "edit" ? "完成" : "编辑"}</Text>
        </TouchableOpacity>
      )
    }
    const SummitButton = () => {
      return(
        <TouchableOpacity
          style={styles.button}
        >
          <Text>提交</Text>
        </TouchableOpacity>
      )
    }
    let navigationBar = <NavigationBar
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      rightButton={[<EditButton key={0}/>, <SummitButton key={1}/>]}
      title={"新建线索"}
      style={styles.navigationBar}
    />

    return (
      <View>
        {navigationBar}
        <TextInput
          multiline={true}
          editable={mode === "edit"}
          style={styles.textInput}
        />
      </View>
    );
  }

  onBack() {
    NavigationUtil.goBack(this.props.navigation);
  }

  onPress = () => {
    this.setState((state) => {
      return {
        mode: state.mode === "edit" ? "" : "edit"
      }
    })
  }

}

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: "#fff",
    elevation: 5,
    height: 50,
  },
  textInput:{
    color: "#000"
  },
  button:{
    backgroundColor: GlobalStyle.baseColor,
    padding: 8,
    marginLeft: 10,
    borderRadius: 8,
  },
})
