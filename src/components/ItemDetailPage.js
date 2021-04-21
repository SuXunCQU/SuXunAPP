import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Button,
    Linking,
    Alert,
    TouchableHighlight, FlatList
} from 'react-native';
import {Carousel, Toast, Modal, Provider,} from '@ant-design/react-native';
import NavigationUtil from "../utils/NavigationUtil";
import NavigationBar from './NavigationBar'
import ViewUtil from '../utils/ViewUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Steps from 'react-native-steps';
import {formateDate} from "../utils/dateUtils";
import JPush from "./jpush/JPush";
import {reqQueryTaskMemberByKey} from "../api";
import {connect} from "react-redux";
import actions from "../redux/action";

const labels = ["启动", "进行", "完成/暂缓"];
const configs = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#00e0c7',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#00e0c7',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#00e0c7',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#00e0c7',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#00e0c7',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#00e0c7'
};

const {width, height, scale} = Dimensions.get("window");
class ItemDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            alertVisible: false,
            successVisible: false,
        }
    }

    phoneCall = (phoneNumber) => {
        const url = `tel:${phoneNumber}`;
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    return Alert.alert('提示', `您的设备不支持该功能，请手动拨打 ${phoneNumber}`, [
                        { text: '确定' }
                    ]);
                }
                return Linking.openURL(url);
            })
            .catch(err => Toast.info(`出错了：${err}`, 1.5));
    };

    actionConfirm = (title) => {
        this.setState(() => ({
            alertVisible: true,
        }))
    }

    componentDidMount() {
        JPush.setLoggerEnable(true);
        JPush.init();
        JPush.getRegistrationID((result) => console.log(result));
    }

    render() {
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            title={'任务详情'}
            style={styles.navigationBar}
        />

        const {data, type, photoBase64} = this.props.navigation.state.params;
        const lostinfo = data.lostinfo;
        const lostTimestamp = new Date().getTime(); // 模仿数据中的timestamp
        const lostTime = new Date(lostTimestamp);
        return (
            <Provider>
                <View style={styles.container}>
                    {navigationBar}
                    {!lostinfo ? <Text>无详情信息</Text>:
                        <ScrollView style={styles.detailContainer}>
                            <View style={styles.topContainer}>
                                <View style={{
                                    width: width * 0.9,
                                    backgroundColor: "#00e0c7",
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    borderColor: "#e8e8e8",
                                    // ios的阴影
                                    shadowColor: 'gray',
                                    shadowOffset: {width: 0.5, height: 0.5},
                                    shadowOpacity: 0.4,
                                    shadowRadius: 1,
                                    // android的阴影
                                    elevation: 10,
                                }}>
                                    <Carousel
                                        style={{
                                            width: width * 0.9,
                                            height: "100%",
                                        }}
                                        dotStyle={{backgroundColor: "#efefef"}}
                                        dotActiveStyle={{backgroundColor: "#121212"}}
                                        selectedIndex={0}
                                        infinite
                                    >
                                        <Image
                                            style={styles.image}
                                            source={{uri: photoBase64}}
                                        />
                                    </Carousel>
                                </View>

                            </View>
                            <View style={styles.textCardContainer}>
                                <View style={styles.textContainer}>
                                    <View style={styles.textBlock}>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>姓名</Text>
                                            <Ionicons name={"person-circle-outline"} size={16}/>
                                        </View>
                                        <Text style={styles.description}>{lostinfo.lost_name}</Text>
                                    </View>
                                    <View style={styles.textBlock}>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>性别</Text>
                                            <MaterialCommunityIcons name={"gender-male-female"} size={16}/>
                                        </View>
                                        <Text style={styles.description}>{lostinfo.lost_gender ? "男" : "女"}</Text>
                                    </View>
                                    <View style={styles.textBlock}>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>年龄</Text>
                                            <MaterialCommunityIcons name={"face"} size={16}/>
                                        </View>
                                        <Text style={styles.description}>{lostinfo.lost_age}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.textCardContainer}>
                                <View style={styles.textContainer}>
                                    <View style={styles.textBlock}>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>走失地点</Text>
                                            <Entypo name={"location-pin"} size={16}/>
                                        </View>
                                        <Text style={styles.description}>{lostinfo.lost_place}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.textCardContainer}>
                                <View style={styles.textContainer}>
                                    <View style={styles.textBlock}>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>走失时间</Text>
                                            <Ionicons name={"time-outline"} size={16}/>
                                        </View>
                                        <Text style={styles.description}>{formateDate(lostinfo.lost_time)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.textCardContainer}>
                                <View style={styles.textContainer}>
                                    <View style={styles.textBlock}>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>其他信息</Text>
                                            <MaterialCommunityIcons name={"message-processing-outline"} size={16}/>
                                        </View>
                                        <Text style={styles.description}>{lostinfo.lost_appearance}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.textCardContainer}>
                                <View style={styles.textContainer}>
                                    <TouchableOpacity style={styles.textBlock} onPress={() => this.phoneCall("110")}>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>报警电话</Text>
                                            <MaterialCommunityIcons name={"police-badge-outline"} size={16}/>
                                        </View>
                                        <View style={styles.label}>
                                            <Text style={styles.description}>110</Text>
                                            <Feather name={"phone-call"}/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.textBlock} onPress={() => this.phoneCall("120")}>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>急救电话</Text>
                                            <MaterialCommunityIcons name={"ambulance"} size={16}/>
                                        </View>
                                        <View style={styles.label}>
                                            <Text style={styles.description}>120</Text>
                                            <Feather name={"phone-call"}/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.textBlock}
                                                      onPress={ async () => {
                                                          console.log(data.task_id);
                                                          const response = await reqQueryTaskMemberByKey(data.task_id);
                                                          console.log(response);

                                                          this.setState({
                                                              modalVisible: true,
                                                              members: response.result,
                                                          })}}
                                    >
                                        <View style={styles.label}>
                                            <Text style={styles.title}>行动队员电话</Text>
                                            <Ionicons name={"people"} size={16}/>
                                        </View>
                                        <View style={[styles.label, {justifyContent: "flex-end"}]}>
                                            <Text style={styles.description}>查看列表</Text>
                                            <Feather name={"phone-call"}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.textCardContainer, {height: 80, justifyContent: "center"}]}>
                                <Steps
                                    configs={configs}
                                    current={1}
                                    count={3}
                                    labels={labels}
                                />
                            </View>

                            {type === "recruit" ? (
                                <View style={styles.buttonContainer}>
                                    <View style={{flex:1, marginLeft: 20, marginRight: 10}}>
                                        <TouchableOpacity style={[styles.button, styles.openButton,  {marginTop: 0,}]} onPress={this.actionConfirm}>
                                            <Text style={{...styles.textStyle, marginTop: 0,}}>加入</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.buttonContainer}>
                                    <View style={{flex:1, marginLeft: 20, marginRight: 10}}>
                                        <TouchableOpacity style={[styles.button, styles.openButton,  {marginTop: 0,}]} onPress={this.actionConfirm}>
                                            <Text style={{...styles.textStyle, marginTop: 0,}}>退出</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex:1, marginRight: 20, marginLeft: 10}}>
                                        <TouchableOpacity style={[styles.button, styles.openButton, {marginTop: 0,}]} onPress={this.actionConfirm}>
                                            <Text style={{...styles.textStyle}}>完成</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                    }

                    {/* 确认操作 */}
                    <Modal
                        animationType="slide"
                        visible={this.state.alertVisible}
                        transparent
                        style={{backgroundColor: "transparent"}}

                    >
                        <View style={styles.modalView}>
                            <View style={styles.textContainer}>
                                <Text style={{fontWeight: "bold"}}>请再次确认操作</Text>
                            </View>

                            <View style={{...styles.buttonContainer, marginVertical: 0}}>
                                <TouchableOpacity
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3", marginRight:10, flex: 1 }}
                                    onPress={() => {
                                        console.log("pressed");
                                        this.setState((prevState) => ({
                                            alertVisible: false
                                        }))
                                    }}
                                >
                                    <Text style={styles.textStyle}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3", flex: 1 }}
                                    onPress={() => {
                                        this.setState((prevState) => ({
                                            alertVisible: false,
                                            successVisible: true,
                                        }));
                                        console.log(this.props);
                                        this.props.onAddJoinListItem(data);
                                        JPush.addLocalNotification({
                                            "messageID": "0",
                                            "title": "当前加入的最新任务",
                                            "content": `${lostinfo.lost_place}${lostinfo.lost_age}岁${lostinfo.lost_name}走失`,
                                        });
                                    }}
                                >
                                    <Text style={styles.textStyle}>确认</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* 成功提交 */}
                    <Modal
                        animationType="slide"
                        visible={this.state.successVisible}
                        transparent
                        style={{backgroundColor: "transparent"}}

                    >
                        <View style={styles.modalView}>
                            <View style={styles.textContainer}>
                                <AntDesign name={"checkcircleo"} style={{color: "green", fontSize: 32, marginRight: 16}}/>
                                <Text>加入成功</Text>
                            </View>

                            <View style={{...styles.buttonContainer, marginVertical: 0}}>
                                <TouchableOpacity
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3", flex: 1 }}
                                    onPress={() => {
                                        this.setState((prevState) => ({
                                            successVisible: false
                                        }))
                                    }}
                                >
                                    <Text style={styles.textStyle}>确认</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* 队员号码列表 */}
                    <Modal
                        animationType="slide"
                        visible={this.state.modalVisible}
                        transparent
                        style={{backgroundColor: "transparent"}}
                        onRequestClose={() => {
                            this.setState((prevState) => ({
                                modalVisible: false
                            }))
                        }}
                    >
                        <View style={styles.modalView}>
                            <FlatList
                                style={{maxHeight: 0.7 * height, width: "100%"}}
                                contentContainerStyle={{alignItems: "center", width: "100%"}}
                                data={this.state.members || []}
                                renderItem={(data) => {
                                    const item = data.item;
                                    return (
                                        <View style={styles.phoneCardContainer}>
                                            <View style={styles.textContainer}>
                                                <TouchableOpacity style={styles.textBlock} onPress={() => this.phoneCall(item.member_phone)}>
                                                    <View style={styles.label}>
                                                        <Text style={styles.title}>{item.member_name}</Text>
                                                        <Ionicons name={"person-circle-outline"} size={16}/>
                                                    </View>
                                                    <View style={styles.label}>
                                                        <Text style={styles.description}>{item.member_phone}</Text>
                                                        <Feather name={"phone-call"}/>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }}

                            />

                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setState((prevState) => ({
                                        modalVisible: false
                                    }))
                                }}
                            >
                                <Text style={styles.textStyle}>关闭</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>


                </View>
            </Provider>

    )
    }

    onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }
}

const mapDispatchToProps = (dispatch) => ({
    onAddJoinListItem: (data) => dispatch(actions.onAddJoinListItem(data)),
})

export default connect(null, mapDispatchToProps)(ItemDetailPage);

const styles = StyleSheet.create({
    container: {
        height: height,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fefefe",
        paddingBottom: 40,
    },
    detailContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#00e0c7",
    },
    topContainer: {
        width,
        height: height * 2 / 5,
        alignItems: "center",
        marginTop: 20,
    },
    bottomContainer: {
        justifyContent: "flex-start",
        margin: 10,
        marginTop: 20,
    },
    imageContainer: {
        width,
        height: "100%",
        borderWidth: 1 / scale,
        borderColor: "#e8e8e8",
        borderRadius: 20,
        // ios的阴影
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        // android的阴影
        elevation: 10,
    },
    image: {
        width: width - 40,
        height: "100%",
        borderWidth: 1,
        borderRadius: 20,
    },
    textCardContainer: {
        minHeight: 50,
        backgroundColor: "#fefefe",
        borderWidth: 1 / scale,
        borderColor: "#e8e8e8",
        borderRadius: 10,
        margin: 20,
        marginBottom: 0,
        // ios的阴影
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        // android的阴影
        elevation: 5,
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    title: {
        fontWeight: "bold",
        marginRight: 5,
    },
    label: {
        flexDirection: "row",
        alignItems: "center",
    },
    description: {
        color: "#555",
        marginRight: 10,
    },
    navigationBar: {
        backgroundColor: "#fff",
        elevation: 5,
        height: 50,
    },
    detail: {
        marginHorizontal: 10,
        marginBottom: 5,
    },
    buttonContainer: {
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "#00e0c7",
        height: 40,
        borderRadius: 10,
    },

    modalView: {
        backgroundColor: "#fefefe",
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        width: "100%",
        backgroundColor: "#1890ff",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    phoneCardContainer:{
        width: 0.7 * width,
        height: 50,
        backgroundColor: "#fefefe",
        borderWidth: 1 / scale,
        borderColor: "#e8e8e8",
        borderRadius: 10,
        marginBottom: 10,
        // ios的阴影
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        // android的阴影
        elevation: 5,
    }
});
