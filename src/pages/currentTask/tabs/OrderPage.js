import React from 'react';
import {View, Text, StyleSheet, Button, FlatList, RefreshControl, Dimensions} from 'react-native';
import MessageItem from '../../../components/MessageItem';
import NavigationBar from '../../../components/NavigationBar';
import ViewUtil from '../../../utils/ViewUtil';
import NavigationUtil from '../../../utils/NavigationUtil';
import {connect} from 'react-redux';
import actions from '../../../redux/action';
import {order_data} from '../../../utils/mockUtils';
import {reqQueryOrderByKey} from "../../../api";

const THEME_COLOR = "red";
const {width, height, scale} = Dimensions.get("window");
export default class OrderPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {
    const response = await this.loadData();
    console.log(response);
    this.setState({
      "orders": response.result,
    })
  }

  loadData() {
    const task_id = 2;
    return reqQueryOrderByKey(task_id).then((response) => {
      return response;
    })
  }

  renderItem(data){
    const item = data.item;
    return(
        <MessageItem
            item={item}
        />
    )
  }

  onBack() {
    NavigationUtil.goBack(this.props.navigation);
  }

  render(){
    const {navigation} = this.props;
    let {orders} = this.state;
    if(!orders)
      orders = [];
    let navigationBar = <NavigationBar
        leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
        title={'指令'}
        style={styles.navigationBar}
    />
    return(
        <View style={styles.container}>
          {navigationBar}
          <FlatList
              data={orders}
              renderItem={(data)=>this.renderItem(data)}
              keyExtractor={(item)=> ""+item.id}
              refreshControl={
                <RefreshControl
                    title={'Loading'}
                    titleColor={THEME_COLOR}
                    colors={[THEME_COLOR]}
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
