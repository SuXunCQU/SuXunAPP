import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, RefreshControl } from 'react-native';
import {connect} from 'react-redux';
import actions from '../../../redux/action';
import GlobalStyle from '../../../res/style/GlobalStyle';
import orderList from '../../../res/data/order.json';
import NavigationBar from '../../../components/NavigationBar';
import ViewUtil from '../../../utils/ViewUtil';
import NavigationUtil from '../../../utils/NavigationUtil';
import OrderItem from "../../../components/OrderItem";

const THEME_COLOR = "red";
export default class OrderPage extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    // this.loadData();
  }

  loadData() {
    // console.log(this.props && this.props.clueList);
  }

  renderItem(data){
    const item = data.item;
    return(
      <OrderItem
        item={item}
      />
    )
  }

  onBack() {
    NavigationUtil.goBack(this.props.navigation);
  }

  render(){
    const {navigation} = this.props;
    let navigationBar = <NavigationBar
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      title={'指令'}
      style={styles.navigationBar}
    />
    return(
      <View style={styles.container}>
        {navigationBar}
        <FlatList
          data={orderList}
          renderItem={(data)=>this.renderItem(data)}
          keyExtractor={(item)=> ""+item.order_id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={orderList.isLoading}
              onRefresh={()=>this.loadData()}
              tintColor={THEME_COLOR}
            />
          }
          style={styles.list}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome:{
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  itemContainer:{
    marginBottom: 10
  },
  list:{
    flex: 1,
    width: "100%",
  },
  navigationBar: {
    backgroundColor: "#fff",
    elevation: 5,
    height: 50,
  },
});
