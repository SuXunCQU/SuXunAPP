import React, { Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text, Switch} from 'react-native';
import NavigationUtil from '../utils/NavigationUtil';
import GlobalStyle from '../res/style/GlobalStyle';
import actions from "../redux/action";
import {connect} from 'react-redux';

class ListItem extends Component {
    constructor(props) {
        super(props);
    }
    onSwitchChange = () => {
        const lostId = this.props.item.lost_id;
        const {mainTaskId} = this.props;
        console.log("Switch Executed");
        // 1. 将选中的任务切换为默认时
        if(lostId !== mainTaskId){
            this.props.onMainTaskChange(lostId);
            this.props.onMainTaskDetailChange(this.props.item);
        }
        // 2. 从当前默认的任务切换为关闭时（即取消当前的默认）
        else if(lostId === mainTaskId){
            this.props.onMainTaskChange(-1);
        }
    };

    render() {
        console.log("ListItem render!");
        const {item} = this.props;
        if(!item || !item.lost_name)
            return null;
        const lostTimestamp = new Date().getTime(); // 模仿数据中的timestamp
        const lostTime = new Date(lostTimestamp);
        return (
            <TouchableOpacity
                onPress={()=>{
                    NavigationUtil.goPage({data: item}, "ItemDetailPage");
                }}>
                <View style={styles.itemContainer}>
                    <View style={styles.leftContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{uri: "logo512"}}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Text>设置默认</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.props.mainTaskId === this.props.item.lost_id ? "#3498db" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.onSwitchChange}
                                value={this.props.mainTaskId === this.props.item.lost_id}
                            />
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text>姓名：{item.lost_name}</Text>
                        <Text>性别：{item.lost_gender}</Text>
                        <Text>年龄：{item.lost_age}</Text>
                        <Text>{`走失时间：${lostTime.getFullYear()}-${lostTime.getMonth() + 1}-${lostTime.getDate()} ${lostTime.getHours()}:${lostTime.getMinutes()}:${lostTime.getSeconds()}`}</Text>
                        <Text>走失地点：{item.lost_location}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
};

const mapStateToProp = (state) => ({
    mainTaskId: state.taskItem.task_id
});
const mapDispatchToProp = (dispatch) => ({
    onMainTaskChange: (id) => dispatch(actions.onMainTaskChange(id)),
    onMainTaskDetailChange: (item) => dispatch(actions.onMainTaskDetailChange(item)),
});
export default connect(mapStateToProp, mapDispatchToProp)(ListItem);

const styles = StyleSheet.create({
    itemContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        minHeight: 100,
        backgroundColor: GlobalStyle.itemBaseColor,
        marginVertical: 5,
        // borderWidth: 0.5,
        // ios的阴影
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        // android的阴影
        // elevation: 5,
    },
    imageContainer:{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
    },
    image:{
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 14,
        marginBottom: 2,
        color: '#212121',
    },
    description:{
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    rightContainer:{
        flex: 2,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    leftContainer:{
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // borderTopWidth: 1,
        // borderTopColor: "#000",
    }
});
