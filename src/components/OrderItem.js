import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import GlobalStyle from '../res/style/GlobalStyle';

export default class OrderItem extends Component {
  render() {
    const {item} = this.props;
    return (
        <View style={styles.itemContainer}>
          <View style={styles.leftContainer}>
            <Image source={{uri: "logo512"}} style={{flex: 1}}/>
          </View>
          <View style={styles.rightContainer}>
            <Text>{item.order_time}</Text>
            <Text>{item.order_content}</Text>
          </View>
        </View>
    )
  }
};

const styles = StyleSheet.create({
  itemContainer:{
    width: "100%",
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: GlobalStyle.itemBaseColor,
    marginVertical: 5,
    // ios的阴影
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    // android的阴影
    elevation: 5,
  },
  leftContainer:{
    flex: 1,
  },
  rightContainer:{
    flex: 5,
    marginLeft: 5,
  }
})
