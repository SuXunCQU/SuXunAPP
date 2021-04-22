import React, {Component} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import NavigationUtil from "../../utils/NavigationUtil";
import Label from './Label';
import actions from '../../redux/action'
import {connect} from 'react-redux';
import {reqPhoto} from "../../api";

const {width, height, scale} = Dimensions.get("window");
const IMAGE_MARGIN_RIGHT = 3;
class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.photos = [
            {
                uri: "logo512",
            },
        ];
        this.labelColor = [
            "#FF503F",
            "#FFD561",
            "#52BBFF",
            "#53FC96",
            "#9A9999",
        ];
        this.labelName = [
            "一级",
            "二级",
            "三级",
            "四级",
            "五级",
        ];
    }

    onSwitchChange = () => {
        const lostId = this.props.item.task_id;
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

    async componentDidMount() {
        const response = await reqPhoto(`${this.props.item.lostinfo.incident_id}.jpg`);
        this.setState({
            "photoBase64": `data:image/jpg;base64,${response.result}`,
        })
    }

    render() {
        const {item, type} = this.props;
        const lostinfo = item && item.lostinfo;
        if(!lostinfo || !lostinfo.lost_name)
            return null;
        const lostTimestamp = new Date().getTime(); // 模仿数据中的timestamp
        const lostTime = new Date(lostTimestamp);
        const level = Math.floor(Math.random() * 5)
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>{
                    NavigationUtil.goPage({data: item, type: type, photoBase64: this.state.photoBase64}, "ItemDetailPage");
                }}>
                <View style={styles.itemContainer}>
                    <View style={styles.topContainer}>
                        <View style={[styles.header, {borderLeftColor: this.labelColor[Math.floor(item.task_level / 4)] || this.labelColor[0]}]}>
                            <Text style={{fontWeight: "bold", width: 0.70 * width}}>{lostinfo.lost_place}{lostinfo.lost_age}岁{lostinfo.lost_name}走失</Text>
                            <Label
                                labelName={this.labelName[Math.floor(item.task_level / 4)] || this.labelName[0]}
                                labelColor={this.labelColor[Math.floor(item.task_level / 4)] || this.labelColor[0]}
                            />
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>{lostinfo.lost_appearance}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <FlatList
                            data={this.photos}
                            renderItem={
                                (item) => {
                                    return (
                                        <View style={[styles.imageView, {width: imageWidth}]}>
                                            <Image
                                                style={styles.image}
                                                source={{ uri:this.state.photoBase64}}
                                            />
                                        </View>
                                    )
                                }
                            }
                            extraData={this.state}
                            numColumns={3}
                            keyExtractor={(lostinfo,index) => index}
                            style={styles.imageContainer}
                            contentContainerStyle={styles.listViewStyle}
                            columnWrapperStyle={{marginBottom: IMAGE_MARGIN_RIGHT}}
                        />
                        {type === "recruit" ? (
                            <View style={[styles.detailContainer, {justifyContent: "flex-end"}]}>
                                <Text>查看详情</Text>
                            </View>
                        ) : (
                            <View style={styles.detailContainer}>
                                <View style={{flexDirection: "row", justifyContent:"center", alignItems: "center", paddingLeft: 10}}>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={this.props.mainTaskId === item.task_id ? "#3498db" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={this.onSwitchChange}
                                        value={this.props.mainTaskId === item.task_id}
                                        style={styles.button}
                                    />
                                    <Text>设为当前任务</Text>
                                </View>
                                <Text>查看详情</Text>
                            </View>
                        )}

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const mapStateToProp = (state) => ({
    joinedList: state.joinedList,
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
        backgroundColor: "#fefefe",
        margin: 10,
        borderRadius: 15,
        // borderWidth: 0.5,
        // ios的阴影
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        // android的阴影
        elevation: 5,

    },
    topContainer:{
        width: "100%",
        backgroundColor: "#fefefe",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomColor: "#fefefe",
    },
    bottomContainer:{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fefefe",
        borderRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    imageContainer:{
        width: "100%",
        borderBottomWidth: 1 / scale,
        borderBottomColor: "#e8e8e8",
        padding: 10,
    },
    imageView:{
        borderWidth: 1,
        width: (width - 60) / 3,
        height: 100,
        marginRight: IMAGE_MARGIN_RIGHT
    },
    listViewStyle:{
        flexDirection: "row",
        alignItems: "center",
    },
    image:{
        width: "100%",
        height: "100%",
    },
    header:{
        width: "100%",
        height: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        paddingHorizontal: 5,
        marginTop: 15,
        borderLeftWidth: 10,
        borderLeftColor: "#000",
    },
    descriptionContainer:{
        width: "100%",
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
    },
    detailContainer:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fefefe",
        height: 30,
        paddingRight: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
});

const imageWidth = (width - 2 * styles.itemContainer.margin - 2 * styles.imageContainer.padding - 2 * styles.imageView.marginRight) / 3;
