import React, { Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text, Switch, Dimensions, FlatList} from 'react-native';
import NavigationUtil from "../../utils/NavigationUtil";
import Label from './Label';
import GlobalStyle from "../../res/style/GlobalStyle";
import actions from '../../redux/action'
import {connect} from 'react-redux';

const {width, height, scale} = Dimensions.get("window");
class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.photos = [
            {
                uri: "logo512",
            },
            {
                uri: "logo512",
            },
            {
                uri: "logo512",
            },
            {
                uri: "logo512",
            },

        ]
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
                    <View>
                        <View style={styles.header}>
                            <Text>{item.lost_location}{item.lost_age}{item.lost_name}走失</Text>
                            <Label level={1}/>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>描述</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.props.mainTaskId === this.props.item.lost_id ? "#3498db" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.onSwitchChange}
                                value={this.props.mainTaskId === this.props.item.lost_id}
                                style={styles.button}
                            />
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <FlatList
                            data={this.photos}
                            renderItem={(item) => <View style={{borderWidth: 1, width: (width - 40)/ 3, height: 100, marginRight: 10}}><Image style={styles.image} source={{uri: "logo512"}}/></View>}
                            numColumns={3}
                            style={styles.imageContainer}
                            contentContainerStyle={styles.listViewStyle}
                            columnWrapperStyle={{marginBottom: 10}}
                        />
                        <View style={styles.detailContainer}>
                            <Text>查看详情</Text>
                        </View>

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
export default connect(mapStateToProp, mapDispatchToProp)(TaskItem);

const styles = StyleSheet.create({
    itemContainer:{
        flex: 1,
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
    bottomContainer:{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff',
    },
    imageContainer:{
        width: width,
        borderTopWidth: 1/ scale,
        borderTopColor: "#e8e8e8",
        borderBottomWidth: 1 / scale,
        borderBottomColor: "#e8e8e8",
        padding: 10,
    },
    listViewStyle:{
        flexWrap: 'wrap',
        flexDirection: "row",
        alignItems: "center",
    },
    image:{
        width: "100%",
        height: "100%",
    },
    header:{
        width: "100%",
        height: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        paddingHorizontal: 5,
        borderLeftColor: "green",
        borderLeftWidth: 10,
    },
    descriptionContainer:{
        width,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    description:{
        fontSize: 14,
        color: "grey",
        marginHorizontal: 15,
        marginBottom: 10,
    },
    button:{
        marginBottom: 10,
    },
    detailContainer:{
        width,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: 5,
        paddingRight: 20,
    },

    title: {
        fontSize: 14,
        marginBottom: 2,
        color: '#212121',
    },

});
