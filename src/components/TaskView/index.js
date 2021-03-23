import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { pxToDp, screenWidth } from "../../utils/styleKits";
import { Color, Layout, Size } from "../../utils/GlobalStyle";

class Index extends Component {

  /**
   * 查看任务详情
   */
  seeDetails = (taskId) => {
    // TO DO
    console.log("seeDetails");
    return () => {
      console.log("taskId", taskId);
    };
  };

  render() {
    console.log("props", this.props);
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        key={this.props.id}
        onPress={this.seeDetails(this.props.id)}
      >
        <Image style={styles.image}
               source={{ uri: this.props.url }} />
        <Text style={styles.title}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

export default Index;


const styles = StyleSheet.create({
  container: {
    width: screenWidth / 2,
    height: pxToDp(200),
    borderColor: Color.font.alleviate,
    borderWidth: pxToDp(1),
    backgroundColor: "white",
    borderRadius: pxToDp(15),
    overflow: "hidden",
    ...Layout.flex.horizonVerticalCenter,
  },
  image: {
    padding: pxToDp(5),
    width: screenWidth / 2 - pxToDp(7),
    height: pxToDp(150),
    borderWidth: Size.borderWidth,
    borderColor: Color.border,
  },
  title: {
    width: screenWidth / 2,
    height: pxToDp(50),
    borderWidth: Size.borderWidth,
    borderColor: Color.border,
    fontSize: Size.font.normal,
  },
});


