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
    TouchableHighlight
} from 'react-native';
import {Carousel, Toast, Modal, Provider,} from '@ant-design/react-native';
import NavigationUtil from "../utils/NavigationUtil";
import NavigationBar from './NavigationBar'
import ViewUtil from '../utils/ViewUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Steps from 'react-native-steps';

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
export default class ItemDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            alertVisible: false,
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

    render() {
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            title={'任务详情'}
            style={styles.navigationBar}
        />

        const {data, type} = this.props.navigation.state.params;
        const lostTimestamp = new Date().getTime(); // 模仿数据中的timestamp
        const lostTime = new Date(lostTimestamp);
        return (
            <Provider>
                <View style={styles.container}>
                    {navigationBar}
                    {!data ? <Text>无详情信息</Text>:
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
                                            source={{ uri: "data:image/jpeg;base64,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" }}
                                        />
                                        <Image
                                            style={styles.image}
                                            source={{ uri: "data:image/jpeg;base64,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" }}
                                        />
                                        <Image
                                            style={styles.image}
                                            source={{ uri: "data:image/jpeg;base64,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" }}
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
                                        <Text style={styles.description}>{data.lost_name}</Text>
                                    </View>
                                    <View style={styles.textBlock}>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>性别</Text>
                                            <MaterialCommunityIcons name={"gender-male-female"} size={16}/>
                                        </View>
                                        <Text style={styles.description}>{data.lost_gender ? "男" : "女"}</Text>
                                    </View>
                                    <View style={styles.textBlock}>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>年龄</Text>
                                            <MaterialCommunityIcons name={"face"} size={16}/>
                                        </View>
                                        <Text style={styles.description}>{data.lost_age}</Text>
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
                                        <Text style={styles.description}>{data.lost_place}</Text>
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
                                        <Text style={styles.description}>{`${lostTime.getFullYear()}-${lostTime.getMonth() + 1}-${lostTime.getDate()} ${lostTime.getHours()}:${lostTime.getMinutes()}:${lostTime.getSeconds()}`}</Text>
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
                                        <Text style={styles.description}>详情</Text>
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
                                                      onPress={ () => {
                                                          this.setState({
                                                              modalVisible: true,
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
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setState((prevState) => ({
                                alertVisible: !(prevState.alertVisible)
                            }))
                        }}
                    >
                        <View style={styles.modalView}>
                            <View style={styles.textContainer}>
                                <Text style={{fontWeight: "bold"}}>请再次确认操作</Text>
                            </View>

                            <View style={{...styles.buttonContainer, marginVertical: 0}}>
                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3", marginRight:10, flex: 1 }}
                                    onPress={() => {
                                        this.setState((prevState) => ({
                                            alertVisible: !(prevState.alertVisible)
                                        }))
                                    }}
                                >
                                    <Text style={styles.textStyle}>取消</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3", flex: 1 }}
                                    onPress={() => {
                                        this.setState((prevState) => ({
                                            alertVisible: !(prevState.alertVisible)
                                        }))
                                    }}
                                >
                                    <Text style={styles.textStyle}>确认</Text>
                                </TouchableHighlight>
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
                            Alert.alert("Modal has been closed.");
                            this.setState((prevState) => ({
                                modalVisible: !(prevState.modalVisible)
                            }))
                        }}
                    >
                        <View style={styles.modalView}>
                            <View style={styles.phoneCardContainer}>
                                <View style={styles.textContainer}>
                                    <TouchableOpacity style={styles.textBlock} onPress={() => this.phoneCall("110")}>
                                        <View style={styles.label}>
                                            <Text style={styles.title}>报警电话</Text>
                                            <Ionicons name={"person-circle-outline"} size={16}/>
                                        </View>
                                        <View style={styles.label}>
                                            <Text style={styles.description}>110</Text>
                                            <Feather name={"phone-call"}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setState((prevState) => ({
                                        modalVisible: !(prevState.modalVisible)
                                    }))
                                }}
                            >
                                <Text style={styles.textStyle}>关闭</Text>
                            </TouchableHighlight>
                        </View>
                    </Modal>
                </View>
            </Provider>

    )
    }

    onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }
};

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
        height: 50,
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
        padding: 10,
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
        width: "100%",
        height: 50,
        backgroundColor: "#fefefe",
        borderWidth: 1 / scale,
        borderColor: "#e8e8e8",
        borderRadius: 10,
        marginHorizontal: 20,
        // ios的阴影
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        // android的阴影
        elevation: 5,
    }
});
